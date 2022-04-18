<template>
  <VChart :option="option" style="margin-bottom: 1em" ref="chart" @datazoom="checkEnd" />
</template>

<script>
import options from "@/config/charts/candlestickChartOptions.mobile.js";
import { onMounted, onUnmounted, reactive, ref, toRefs, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CandlestickChart } from "echarts/charts";
import { GridComponent, DataZoomComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";

export default {
  props: {
    crypto: {
      type: String,
      required: true
    },

    base: {
      type: String,
      required: true
    },

    interval: {
      type: String,
      required: true
    }
  },

  components: { VChart },

  setup(props) {
    use([CandlestickChart, CanvasRenderer, GridComponent, DataZoomComponent, TooltipComponent ]);
    const chart = ref(null);
    const store = useCryptoStore();
    const { crypto, base, interval } = toRefs(props);
    const option = reactive(options);
    let klinesSocket;
    let isLoading = false;

    // Function called by the websocket for every new kline
    const klineUpdate = ({ data }) => {
      // Parse the data
      const kline = JSON.parse(data);
      const { t, o, h, l, c } = kline.k;
      // Convert to float
      const newKline = [t, o, h, l, c].map(k => parseFloat(k));
      // Check if it's a new candle
      if (t !== option.series.data[option.series.data.length - 1][0]) {
        // Update the maximum x axis value
        option.xAxis.max += t - option.series.data[option.series.data.length - 1][0];
        // Add candle
        option.series.data.push(newKline);
      } else {
        // Or an update of the last one
        option.series.data[option.series.data.length - 1] = newKline;
      }
    };

    const loadData = async () => {
      // Close possibly existing socket
      klinesSocket && klinesSocket.close();
      const { klines, socket } = await store.getKlines(crypto.value, base.value, interval.value);
      // Set white space to the right of the chart 
      option.xAxis.max = klines[klines.length - 1][0] + (klines[klines.length - 1][0] - klines[klines.length - 2][0]) * klines.length / 400;
      // Set maximum zoom
      option.dataZoom.minSpan = 1500 / klines.length;

      option.series.data = klines;

      socket.onmessage = klineUpdate;
      klinesSocket = socket;
      // Zoom on chart
      chart.value.dispatchAction({
        type: "dataZoom",
        start: 100
      });
    };

    // Load the data when mounted and when base or interval change
    onMounted(loadData);
    watch([base, interval], loadData);

    const checkEnd = async ({ batch }) => {
      if (!batch) return;
      const [kline] = batch;
      if (kline.start || isLoading) return;
      isLoading = true;
      // The end of the chart has been reached: need to load more data.
      const { klines } = await store.getKlines(
        crypto.value, base.value, interval.value, 
        { 
          end: option.series.data[0][0] - (option.series.data[1][0] - option.series.data[0][0]), 
          noSocket: true 
        }
      );

      option.series.data = [...klines, ...option.series.data];
      // Set maximum zoom
      option.dataZoom.minSpan = 1500 / klines.length / option.series.data.length / klines.length;

      // Return to the last position
      chart.value.dispatchAction({
        type: "dataZoom",
        start: 100 / (option.series.data.length / klines.length),
        end: 100 / (option.series.data.length / klines.length) + kline.end / (option.series.data.length / klines.length)
      });

      isLoading = false;
    };

    // Close the socket when the component is unmounted
    onUnmounted(() => klinesSocket && klinesSocket.close());
    return { chart, option, checkEnd };
  }
}
</script>

<style lang="sass">
  canvas
    border-radius: 0 0 1.5em 1.5em
    cursor: crosshair
</style>