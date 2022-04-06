<template>
  <VChart :option="option" />
</template>

<script>
import options from "@/config/candlestickChartOptions.js";
import { onMounted, reactive, toRefs } from "vue";

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
    }
  },

  components: { VChart },

  setup(props) {
    use([CandlestickChart, CanvasRenderer, GridComponent, DataZoomComponent, TooltipComponent ]);
    const { crypto, base } = toRefs(props);

    // Temporary load the data
    onMounted(() => {
      fetch("https://api.binance.com/api/v3/klines?symbol=ETHEUR&interval=5m")
        .then(res => res.json())
        .then(data => {
          data = data.slice(-100, -1);
          // Convert to float
          data = data.map(candle => candle.slice(0, 5).map(c => parseFloat(c)));
          option.series.data = data;
      });
    });

    const option = reactive(options);
    return { option }
  }
}
</script>

<style lang="sass">
  canvas
    border-radius: 0 0 1.5em 1.5em
    cursor: crosshair
</style>