<template>
  <section>
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
    <div class="stats">
      <span class="price">
        <h2>$95.23</h2>
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
      <CandlestickChart :crypto="crypto" :base="base" />
    </div>
  </section>
</template>

<script setup>
import ChartOptions from "@/components/ChartOptions.vue";
import CandlestickChart from "@/components/CandlestickChart.vue";
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
  h2
    font-weight: normal

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
</style>