<template>
  <div class="chart-container bg-dark nohover">
    <BarChart :earnings="earnings" />
  </div>
</template>

<script setup>
import BarChart from "D#/charts/BarChart.vue";

defineProps({
  earnings: {
    type: Object,
    required: true
  }
});
</script>

<style lang="sass" scoped>
  .chart-container
    height: 40vh
    border-radius: 1.5em

</style>