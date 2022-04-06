<template>
  <h1>Wallet Analysis</h1>
  <section class="container">
    <AssetsChart />
    <Chart class="chart" crypto="BTC" base="USDT" dashboard />
  </section>
  <header class="space-between">
    <h1>Assets Analysis</h1>
    <Select :options='["TOTAL", "MONTHLY", "WEEKLY", "DAILY"]' class="h1" />
  </header>
</template>

<script setup>
import AssetsChart from "@/components/AssetsChart.vue"
import Chart from "@/components/Chart.vue";
import Select from "@/components/Select.vue";
</script>

<style lang="sass" scoped>
  .container
    display: flex
    align-items: stretch
    margin-bottom: 2em

  .chart
    flex: 1
</style>
