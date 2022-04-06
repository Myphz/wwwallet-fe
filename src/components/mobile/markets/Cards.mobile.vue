<template>
  <table>
    <thead class="text-secondary">
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>% Change</th>
      </tr>
    </thead>
    <tbody>
      <Card v-for="i in 10" :key="i" />
    </tbody>
  </table>
</template>

<script setup>
import Card from "M#/markets/Card.mobile.vue"
</script>

<style lang="sass" scoped>
  table
    width: 100%
    border-collapse: collapse

  th
    padding: 1em 1.2em
    text-align: left
    font-weight: bold

</style>