<template>
  <div>
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
    <div class="stats">
      <span class="price">
        <span class="h2">$95.23</span>
      </span>
      <span class="statsgroup">
        <span>24h Change</span>
        <span>+1.23%</span>
      </span>
      <span class="statsgroup">
        <span>24h High</span>
        <span class="green">92.73</span>
      </span>
      <span class="statsgroup">
        <span>24h Low</span>
        <span class="red">75.20</span>
      </span>
    </div>
    <div class="chart-container">
      <VChart :option="option" />
    </div>
  </div>
</template>


<script>
import ChartOptions from "@/components/ChartOptions.vue";
import { onMounted, reactive, ref } from "vue";
import options from "@/config/chartOptions.js";

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

  components: { VChart, ChartOptions },

  setup(props) {
    use([CandlestickChart, CanvasRenderer, GridComponent, DataZoomComponent, TooltipComponent ]);

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

<style lang="sass">
  .chart-container
    height: 70vh
    width: 100%
    margin-bottom: 2em

  .stats
    background: $bg-dark
    padding: 1em 4em 0 4em
    display: flex
    justify-content: flex-start
    gap: 2em

  .price
    padding: 0 1em 0 0
    border-right: 1px solid $text-primary
    font-weight: 550

  .statsgroup
    display: inline-flex
    flex-direction: column
    justify-content: center
    
  canvas
    border-radius: 0 0 1.5em 1.5em
    cursor: crosshair

  .green
    color: $green

  .red
    color: $red

</style>