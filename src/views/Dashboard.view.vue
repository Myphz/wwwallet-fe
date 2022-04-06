<template>
  <div class="container">
    <AssetsChart />
    <Chart class="chart" crypto="BTC" base="USDT" dashboard />
  </div>
</template>

<script setup>
import AssetsChart from "@/components/AssetsChart.vue"
import Chart from "@/components/Chart.vue";
</script>

<style lang="sass" scoped>
  .container
    display: flex
    align-items: stretch
    margin-bottom: 2em

  .chart
    flex: 1
</style>
