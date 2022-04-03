<template>
  <section>
    <PieChart />
    <Chart crypto="BTC" base="USDT" />
  </section>
</template>

<script setup>
import PieChart from "@/components/mobile/PieChart.mobile.vue"
import Chart from "@/components/mobile/Chart.mobile.vue";
</script>