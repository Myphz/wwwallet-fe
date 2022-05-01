<template>
  <TransactionAnalysis 
    v-for="(transaction, i) in transactions.slice().reverse()"
    :key="transaction._id"
    :transaction="transaction"
    :transactions="transactions"
    :n="i+1"
    :crypto="crypto"
    :currentValue="currentValue"
  />
</template>

<script setup>
import TransactionAnalysis from "M#/dashboard/TransactionAnalysis.mobile.vue";
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