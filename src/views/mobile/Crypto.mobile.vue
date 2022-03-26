<template>
  <section>
    <Chart crypto="BTC" base="USDT">
      <Transactions crypto="BTC" />
    </Chart>
  </section>
</template>

<script setup>
import Chart from "@/components/mobile/Chart.mobile.vue";
import Transactions from "@/components/mobile/Transactions.mobile.vue";
</script>