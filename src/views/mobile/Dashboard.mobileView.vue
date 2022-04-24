<template>
  <section class="analysis-section">
    <h1>Wallet Analysis</h1>
    <AssetsChart />
    <CryptoChart crypto="BTC" base="USDT" />
  </section>
  <section class="analysis-section">
    <header class="assets-header">
      <h1>Assets Analysis</h1>
      <Select :options='["TOTAL", "MONTHLY", "WEEKLY", "DAILY"]' class="h2 with-border" :withIcon="false" />
    </header>
    <div>
      <AssetsAnalysis :frequency="'DAILY'" />
    </div>
  </section>
  <section class="analysis-section">
    <h1>Earnings Analysis</h1>
    <EarningsChart />
  </section>
</template>

<script setup>
import AssetsChart from "M#/charts/AssetsChart.mobile.vue"
import CryptoChart from "M#/charts/CryptoChart.mobile.vue";
import Select from "U#/Select.vue";
import AssetsAnalysis from "M#/dashboard/AssetsAnalysis.mobile.vue";
import EarningsChart from "M#/charts/EarningsChart.mobile.vue";
</script>

<style lang="sass" scoped>
  h1
    margin-bottom: .25em

  .analysis-section
    margin-bottom: 3em

  .assets-header
    margin-bottom: 1.5em

  .with-border
    border-bottom: 2px solid $primary

</style>