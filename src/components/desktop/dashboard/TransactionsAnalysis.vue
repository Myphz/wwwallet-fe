<template>
  <table>
    <thead>
      <th>Pair</th>
      <th>Side</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Average Price</th>
      <th>Earnings</th>
      <th>% Change</th>
    </thead>
    <tbody>
      <TransactionAnalysis v-for="i in 10" />
    </tbody>
  </table>
</template>

<script setup>
import TransactionAnalysis from "D#/dashboard/TransactionAnalysis.vue";
</script>