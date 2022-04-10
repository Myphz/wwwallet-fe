<template>
  <div class="chart-container bg-dark nohover">
    <BarChart />
  </div>
</template>

<script setup>
import BarChart from "D#/charts/BarChart.vue";
</script>

<style lang="sass" scoped>
  .chart-container
    height: 40vh
    border-radius: 2em

</style>