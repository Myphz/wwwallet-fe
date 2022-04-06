<template>
  <section>
    <div class="main-info">
      <h4 class="text-secondary">TOTAL ASSET VALUE</h4>
      <h2>$192,002.42</h2>
    </div>
    <div class="chart-container">
      <PieChart />
    </div>
    <div class="main-info">
      <h4 class="text-secondary">TOTAL EARNINGS</h4>
      <h2>$2,002.42</h2>
    </div>
  </section>
</template>

<script setup>
import PieChart from "@/components/PieChart.vue";
</script>

<style lang="sass" scoped>
  section
    width: 15vw
    height: 45vh
    padding: 2em
    background-color: $bg-dark
    border-radius: 2em
    margin-right: 2em

  .chart-container
    height: 30vh

  .main-info
    display: flex
    flex-direction: column
    align-items: center
</style>