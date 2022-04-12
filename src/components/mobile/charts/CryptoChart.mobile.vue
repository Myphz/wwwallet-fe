<template>
  <section>
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
    <div class="stats time noselect">
      <span v-for="(time, i) in times" :class="activeTime == i ? 'active-time' : ''" @click="activeTime = i">
        {{ time }}
      </span>
    </div>
    <div class="chart-container">
      <CandlestickChart :crypto="crypto" :base="base" />
    </div>
  </section>
</template>


<script setup>
import ChartOptions from "M#/charts/ChartOptions.mobile.vue";
import CandlestickChart from "M#/charts/CandlestickChart.mobile.vue";
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
const times = ["1m", "15m", "1H", "4H", "1D", "1W", "1M"];
const activeTime = ref(0);
</script>

<style lang="sass" scoped>
  section
    background-color: $bg-dark
    border-radius: 1.5em

  .chart-container
    height: 60vh
    margin-bottom: 1em

  h2
    font-weight: normal

  .stats
    padding: .5em 2em 0 2em
    display: flex
    font-weight: 550
    justify-content: flex-start
    gap: 2em

  .time
    color: $text-secondary
    font-weight: bold
    gap: 2em
    margin-bottom: 1em
    span
      cursor: pointer

  .active-time
    color: $text-primary

  .price
    padding: 0 1em 0 0
    border-right: 1px solid $text-primary

  .statsgroup
    display: inline-flex
    flex-direction: column
    justify-content: center
</style>