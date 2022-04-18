<template>
  <VChart :option="option" />
</template>

<script>
import options from "@/config/charts/candlestickChartOptions.js";
import { onMounted, onUnmounted, reactive, toRefs, watch } from "vue";
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
    const store = useCryptoStore();
    const { crypto, base, interval } = toRefs(props);
    const option = reactive(options);
    let klinesSocket;

    // Function called by the websocket for every new kline
    const klineUpdate = ({ data }) => {
      // Parse the data
      const kline = JSON.parse(data);
      const { t, o, h, l, c } = kline.k;
      // Convert to float
      const newKline = [t, o, h, l, c].map(k => parseFloat(k));
      // Check if it's a new candle
      if (t !== option.series.data[option.series.data.length - 1][0]) {
        option.series.data.push(newKline)
      } else {
        // Or an update of the last one
        option.series.data[option.series.data.length - 1] = newKline;
      }
    };

    const loadData = async () => {
      // Close possibly existing socket
      klinesSocket && klinesSocket.close();
      const { klines, socket } = await store.getKlines(crypto.value, base.value, interval.value);
      option.series.data = klines;
      socket.onmessage = klineUpdate;
      klinesSocket = socket;
    };

    // Load the data when mounted and when base or interval change
    onMounted(loadData);
    watch([base, interval], loadData);

    // Close the socket when the component is unmounted
    onUnmounted(() => klinesSocket && klinesSocket.close());
    
    return { option }
  }
}
</script>

<style lang="sass">
  canvas
    border-radius: 0 0 1.5em 1.5em
    cursor: crosshair
</style>