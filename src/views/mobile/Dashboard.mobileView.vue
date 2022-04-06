<template>
  <section>
    <AssetsChart />
    <Chart crypto="BTC" base="USDT" />
  </section>
</template>

<script setup>
import AssetsChart from "@/components/mobile/AssetsChart.mobile.vue"
import Chart from "@/components/mobile/Chart.mobile.vue";
</script>