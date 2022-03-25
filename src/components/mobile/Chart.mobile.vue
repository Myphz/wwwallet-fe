<template>
  <div class="chart-container">
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
    <div class="stats">
      <span class="price">
        <span class="h2">$95.23</span>
      </span>
      <span class="statsgroup">
        <span>% Change</span>
        <span>+1.23%</span>
      </span>
      <span class="statsgroup">
        <span>High</span>
        <span>92.73</span>
      </span>
      <span class="statsgroup">
        <span>Low</span>
        <span>75.20</span>
      </span>
    </div>
    <VChart :option="option" autoresize />
  </div>
</template>


<script>
import ChartOptions from "@/components/mobile/ChartOptions.mobile.vue";
import { onMounted, reactive, ref } from "vue";
import options from "@/config/chartOptions.mobile.js";
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
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  .chart-container
    position: absolute
    width: 98vw
    left: 1vw
    height: 60vh

  .stats
    background: $bg-dark
    padding: 1em 2em 0 2em
    display: flex
    justify-content: flex-start
    gap: 2em

  .price
    padding: 0 1em 0 0
    border-right: 1px solid $text-primary

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