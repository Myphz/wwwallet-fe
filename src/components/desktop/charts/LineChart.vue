<template>
  <VChart :option="option" autoresize />
</template>

<script>
import options from "@/config/charts/lineChartOptions.js";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import VChart from "vue-echarts";
import { onMounted, reactive } from "vue";

export default {
  components: { VChart },

  setup() {
    use([LineChart, CanvasRenderer]);
    const option = reactive(options);

    onMounted(() => {
      fetch("https://api.binance.com/api/v3/klines?symbol=ETHEUR&interval=1m")
        .then(res => res.json())
        .then(data => {
          data = data.slice(-3600, -1);
          // Convert to float
          let i = 0;
          data = data.map(candle => [i++, parseFloat(candle[4])]);
          option.series.data = data;
      });
    });

    return { option }
  }
}
</script>