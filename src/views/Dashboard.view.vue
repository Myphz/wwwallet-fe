<template>
  <div class="container">
    <PieChart />
    <Chart class="chart" dashboard />
  </div>
</template>

<script setup>
import PieChart from "@/components/PieChart.vue"
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
