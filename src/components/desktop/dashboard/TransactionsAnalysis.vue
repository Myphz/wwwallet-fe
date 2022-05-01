<template>
  <table>
    <thead>
      <th>Pair</th>
      <th>Side</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Earnings</th>
      <th>% Change</th>
      <th>Date</th>
    </thead>
    <tbody>
      <TransactionAnalysis 
        v-for="transaction in transactions.slice().reverse()"
        :key="transaction._id"
        :transaction="transaction"
        :transactions="transactions"
        :crypto="crypto"
        :currentValue="currentValue"
      />
    </tbody>
  </table>
</template>

<script setup>
import TransactionAnalysis from "D#/dashboard/TransactionAnalysis.vue";
import Big from "@/helpers/big.helper.js";

defineProps({
  crypto: {
    type: String,
    required: true
  },

  currentValue: {
    type: Big,
    required: true
  },

  transactions: {
    type: Array,
    required: true
  }
});
</script>