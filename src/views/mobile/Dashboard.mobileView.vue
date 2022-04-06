<template>
  <section>
    <AssetsChart />
    <CryptoChart crypto="BTC" base="USDT" />
  </section>
</template>

<script setup>
import AssetsChart from "M#/charts/AssetsChart.mobile.vue"
import CryptoChart from "M#/charts/CryptoChart.mobile.vue";
</script>