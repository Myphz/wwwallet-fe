<template>
  <AssetAnalysis 
    v-for="crypto in Object.keys(totals)" 
    :key="crypto" 
    :crypto="crypto" 
    :totals="totals[crypto]" 
    :currentValue="currentValues[crypto]"
    :transactions="transactions[crypto]"
    :frequency="frequency"
  />
</template>

<script setup>
import AssetAnalysis from "M#/dashboard/AssetAnalysis.mobile.vue";
import { useAuthStore } from "S#/auth.store.js";

defineProps({
  frequency: {
    type: String,
    required: true
  },

  totals: {
    type: Object,
    required: true
  },

  currentValues: {
    type: Object,
    required: true
  }
});

const transactions = useAuthStore().transactions;
</script>