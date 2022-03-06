<template>
  <table>
    <thead class="text-secondary">
      <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Price</th>
        <th>24h Change</th>
        <th>Market cap</th>
      </tr>
    </thead>
    <tbody>
      <Card v-for="i in 10" :key="i" />
    </tbody>
  </table>
</template>

<script setup>
import Card from "@/components/Card.vue"
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *

  table
    width: 100%
    border-collapse: collapse

  th
    padding: 1em 1.5em
    text-align: left

</style>