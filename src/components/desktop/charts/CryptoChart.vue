<template>
  <section>
    <ChartOptions :crypto="crypto" :base="base" v-model="currentBase" />
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
    <div class="time stats noselect">
      <span v-for="(time, i) in TIMES" :class="activeTime == i ? 'active-time' : ''" @click="activeTime = i">
        {{ time }}
      </span>
    </div>
    <div :class="dashboard ? 'chart-container-dashboard' : 'chart-container'">
      <CandlestickChart :crypto="crypto" :base="base" />
    </div>
  </section>
</template>

<script setup>
import ChartOptions from "D#/charts/ChartOptions.vue";
import CandlestickChart from "D#/charts/CandlestickChart.vue";
import { TIMES } from "@/config/config.js";
import { ref } from "vue";

const { crypto, base } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  },

  dashboard: {
    type: Boolean,
    default: false
  }
});

const currentBase = ref(base);
const activeTime = ref(0);
</script>

<style lang="sass" scoped>
  section
    background-color: $bg-dark
    border-radius: 1.5em

  h2
    font-weight: normal

  .chart-container
    height: 70vh
    width: 100%
    margin-bottom: 2em

  .chart-container-dashboard
    height: 34vh
    width: 100%

  .stats
    padding: 1em 4em 0 4em
    display: flex
    justify-content: flex-start
    gap: 2em

  .time
    color: $text-secondary
    font-weight: bold
    span
      cursor: pointer

  .active-time
    color: $text-primary

  .price
    padding: 0 1em 0 0
    border-right: 1px solid $text-primary
    font-weight: 550

  .statsgroup
    display: inline-flex
    flex-direction: column
    justify-content: center
</style>