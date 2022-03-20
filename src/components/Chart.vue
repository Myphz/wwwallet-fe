<template>
  <div>
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
    <VChart :option="option" />
  </div>
</template>

<script setup>
import ChartOptions from "@/components/ChartOptions.vue";
import { onMounted, ref } from "vue";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CandlestickChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  GridComponent,
  CandlestickChart,
]);

const borderColor = "#001d3d";
const textColor = "#003A7B";

const props = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  }
});

const { crypto } = props;
const base = ref(props.base);

onMounted(() => {
  fetch("https://api.binance.com/api/v3/klines?symbol=ETHEUR&interval=5m")
    .then(res => res.json())
    .then(data => {
      data = data.slice(-100, -1);
      data = data.map(candle => candle.slice(0, 5).map(c => parseFloat(c)));

      const series = {
        name: "Series",
        data,
      };
  });
});

const option = {
  xAxis: {
    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
  },
  yAxis: {},
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
      ]
    }
  ]
};
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_variables.sass" as *

  div
    height: 70vh

</style>