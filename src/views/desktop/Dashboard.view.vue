<template>
  <h1>Wallet Analysis</h1>
  <section class="container">
    <AssetsChart />
    <CryptoChart class="chart" crypto="BTC" base="USDT" dashboard />
  </section>
  <header class="space-between">
    <h1>Assets Analysis</h1>
    <Select :options='["TOTAL", "MONTHLY", "WEEKLY", "DAILY"]' class="h1" />
  </header>
  <AssetsAnalysis :frequency="'DAILY'" />
</template>

<script setup>
import AssetsChart from "D#/charts/AssetsChart.vue"
import CryptoChart from "D#/charts/CryptoChart.vue";
import Select from "U#/Select.vue";
import AssetsAnalysis from "D#/dashboard/AssetsAnalysis.vue";
</script>

<style lang="sass" scoped>
  .container
    display: flex
    align-items: stretch
    margin-bottom: 2em

  .chart
    flex: 1
</style>
