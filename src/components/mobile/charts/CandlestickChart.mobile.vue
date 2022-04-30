<template>
  <VChart :option="option" style="margin-bottom: 1em" ref="chart" @datazoom="checkEnd" :class="disabled ? 'disabled' : ''" />
</template>

<script>
import options from "@/config/charts/candlestickChartOptions.mobile.js";
import { onMounted, onUnmounted, reactive, ref, toRefs, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";
import { KLINES_LIMIT } from "@/config/config";

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
    },

    totals: {
      type: Object,
      default: null
    }
  },

  components: { VChart },

  setup(props, ctx) {
    use([CandlestickChart, CanvasRenderer, GridComponent, DataZoomComponent, TooltipComponent]);
    const chart = ref(null);
    const store = useCryptoStore();
    const { crypto, base, interval, totals } = toRefs(props);
    const option = reactive(options);
    const disabled = ref(false);
    let klinesSocket;

    let klinesBuffer;
    let lastTime;

    let isLoading = false; // Check if the component is currently fetching more data
    let allLoaded = false; // Check if all the data has been fetched

    // Function called by the websocket for every new kline
    const klineUpdate = ({ data }) => {
      // Parse the data
      const kline = JSON.parse(data);
      const { t, o, h, l, c } = kline.k;
      let newKline;
      // If it's not from dashboard
      if (!totals.value) {
        // Convert to float if it's not in the dashboard
         newKline = [t, o, h, l, c].map(k => parseFloat(k));
      } else {
        // Otherwise, multiply it by the total crypto quantity
        newKline = [t, ...[o, h, l, c].map(k => parseFloat(totals.value[crypto.value].totalQuantity.times(k).toFixed(2)))];
      }
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

    // Function called by the websocket for every new kline, with many different streams.
    // This function must wait for the stream data of all the crypto to arrive, then push a new kline.
    // Used to display the total value in the dashboard.
    const klineUpdateTotal = ({ data }) => {
      const { data: kline, stream } = JSON.parse(data);
      // Check if it's a new candle
      if (kline.k.t !== lastTime) {
        // If so, reset the buffer
        lastTime = kline.k.t;
        klinesBuffer = {};
      };

      // Save the crypto kline in the buffer
      klinesBuffer[stream] = kline;
      // If the buffer is not full, stop
      if (Object.keys(klinesBuffer).length !== Object.keys(totals.value).length) return;
      // Restore animation if previously disabled
      if (!option.animation) option.animation = true;

      const entries = Object.entries(klinesBuffer);
      // Calculate the new kline
      const newKline = entries.reduce((prev, [streamName, kline]) => {
        // Get the crypto name from the stream (e.g: btcusdt@kline_1m => BTC)
        const crypto = Object.keys(totals.value).find(crypto => streamName.startsWith(crypto.toLowerCase()));

        // Create the kline array
        const { t, o, h, l, c } = kline.k;
        const klineArr = [t, o, h, l, c];
        // Return the values of this kline, multiplied by the quantity of the crypto, plus the previous values
        return [klineArr[0], ...klineArr.slice(1, 5).map((v, i) => parseFloat(totals.value[crypto].totalQuantity.times(v).plus(prev[i+1]).toFixed(2)))];
      }, [0,0,0,0,0]);

      // If it's a new candle, push it
      if (lastTime !== option.series.data[option.series.data.length - 1][0]) {
        // Update the maximum x axis value
        option.xAxis.max += lastTime - option.series.data[option.series.data.length - 1][0];
        option.series.data.push(newKline);
      } else {
        // Otherwise, modify the last one
        option.series.data[option.series.data.length - 1] = newKline;
      }
    };

    const loadData = async () => {
      // Close possibly existing socket
      klinesSocket && klinesSocket.close();
      let klines, socket, isValid;
      klinesBuffer = {};

      if (!totals.value) ({ klines, socket, isValid } = await store.getKlines(crypto.value, base.value, interval.value));
      else ({ klines, socket, isValid } = await store.getDashboardKlines(crypto.value, base.value, interval.value));

      if (isValid === false) {
        disabled.value = true;
        ctx.emit("empty");
      }

      if (!klines?.length) {
        disabled.value = true;
        return ctx.emit("empty");
      }
      // Set white space to the right of the chart 
      option.xAxis.max = Math.max(
        klines[klines.length - 1][0] + (klines[klines.length - 1][0] - (klines[klines.length - 2]?.[0] || 0)) * klines.length / 400, 
        klines[klines.length-1][0] + (klines[klines.length - 1][0] - (klines[klines.length - 2]?.[0] || 0)) * 2
      );
      // Set maximum zoom
      option.dataZoom.minSpan = 1500 / klines.length;

      lastTime = klines[klines.length - 1][0]
      option.series.data = klines;

      if (socket) socket.onmessage = totals.value && crypto.value === "TOTAL" ? klineUpdateTotal : klineUpdate;
      klinesSocket = socket;
      // Zoom on chart
      chart.value.dispatchAction({
        type: "dataZoom",
        start: 100
      });
    };

    // Load the data when mounted and when base or interval change
    onMounted(loadData);
    watch([crypto, base, interval, totals], loadData);

    // Function to load more data if the user has dragged the chart all the way to the left
    const checkEnd = async ({ batch }) => {
      if (!batch) return;
      const [kline] = batch;
      if (kline.start || isLoading || allLoaded) return;
      isLoading = true;
      // The end of the chart has been reached: need to load more data.
      let klines;

      if (!totals.value) {
        ({ klines } = await store.getKlines(crypto.value, base.value, interval.value, 
          { 
            end: option.series.data[0][0] - (option.series.data[1][0] - option.series.data[0][0]), 
            noSocket: true 
          })
        );
      } else {
        ({ klines } = await store.getDashboardKlines(crypto.value, base.value, interval.value,
          { 
            end: option.series.data[0][0] - (option.series.data[1][0] - option.series.data[0][0]), 
            noSocket: true 
          })
        );
      };

      allLoaded = klines.length !== KLINES_LIMIT;

      if (!klines.length) return;
      // Add data
      option.series.data = [...klines, ...option.series.data];
      // Set maximum zoom
      option.dataZoom.minSpan = 1500 / klines.length / option.series.data.length / klines.length;
      console.log(option.dataZoom.minSpan);

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
    return { chart, option, checkEnd, disabled };
  }
}
</script>

<style lang="sass">
  canvas
    border-radius: 0 0 1.5em 1.5em
    cursor: crosshair
</style>

<style lang="sass" scoped>
  .disabled
    filter: blur(10px)
    pointer-events: none
</style>