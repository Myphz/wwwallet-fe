<template>
  <section>
    <Chart crypto="BTC" base="USDT" />
    <Transactions crypto="BTC" />
  </section>
</template>

<script setup>
import Chart from "@/components/Chart.vue";
import Transactions from "@/components/Transactions.vue";
</script>