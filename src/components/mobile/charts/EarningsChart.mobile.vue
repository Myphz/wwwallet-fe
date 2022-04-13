<template>
  <div class="chart-container bg-dark nohover">
    <BarChart />
  </div>
</template>

<script setup>
import BarChart from "M#/charts/BarChart.mobile.vue";
</script>

<style lang="sass" scoped>
  .chart-container
    height: 50vh
    border-radius: 1.5em

</style>