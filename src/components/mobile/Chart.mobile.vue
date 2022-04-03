<template>
  <section class="chart-container">
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
    <div class="stats">
      <span class="price">
        <h2>$95.23</h2>
      </span>
      <span class="statsgroup">
        <span>% Change</span>
        <span>+1.23%</span>
      </span>
      <span class="statsgroup">
        <span>High</span>
        <span class="green">92.73</span>
      </span>
      <span class="statsgroup">
        <span>Low</span>
        <span class="red">75.20</span>
      </span>
    </div>
    <CandlestickChart :crypto="crypto" :base="base" />
    <slot />
  </section>
</template>


<script setup>
import ChartOptions from "@/components/mobile/ChartOptions.mobile.vue";
import CandlestickChart from "@/components/mobile/CandlestickChart.mobile.vue";
import { ref } from "vue";

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
</script>

<style lang="sass" scoped>
  .chart-container
    position: absolute
    width: 98vw
    left: 1vw
    height: 60vh

  h2
    font-weight: normal

  .stats
    background: $bg-dark
    padding: 1em 2em 0 2em
    display: flex
    font-weight: 550
    justify-content: flex-start
    gap: 2em

  .price
    padding: 0 1em 0 0
    border-right: 1px solid $text-primary

  .statsgroup
    display: inline-flex
    flex-direction: column
    justify-content: center
  
  .green
    color: $green

  .red
    color: $red

</style>