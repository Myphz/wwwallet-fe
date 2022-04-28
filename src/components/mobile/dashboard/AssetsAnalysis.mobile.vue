<template>
  <AssetAnalysis 
    v-for="crypto in Object.keys(totals)" 
    :key="crypto" 
    :crypto="crypto" 
    :totals="totals[crypto]" 
    :currentValues="currentValues[crypto]"
    :earnings="earnings[crypto]"
    :frequency="frequency"
  />
</template>

<script setup>
import AssetAnalysis from "M#/dashboard/AssetAnalysis.mobile.vue";
import { toRefs } from "vue";

const props = defineProps({
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
  },

  earnings: {
    type: Object,
    required: true
  }
});

const { frequency, totals, earnings } = toRefs(props);
</script>