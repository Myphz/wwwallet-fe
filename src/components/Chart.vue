<template>
  <div class="chart-container">
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
    <VChart :option="option" autoresize />
  </div>
</template>


<script>
import ChartOptions from "@/components/ChartOptions.vue";
import { onMounted, reactive, ref } from "vue";
import options from "@/config/chartOptions.js";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CandlestickChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
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

  components: { VChart, ChartOptions },

  setup(props) {
    use([CanvasRenderer, GridComponent, CandlestickChart]);

    const { crypto } = props;
    const base = ref(props.base);
    const option = reactive(options);

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

    return { crypto, base, option }
  }
}
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_variables.sass" as *

  .chart-container
    height: 70vh

</style>