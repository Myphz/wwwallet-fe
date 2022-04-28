<template>
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Average Buy Price</th>
        <th>Average Sell Price</th>
        <th>Current Price</th>
        <th>Earnings</th>
        <th>Change</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <AssetAnalysis 
        v-for="crypto in Object.keys(totals)" 
        :key="crypto" 
        :crypto="crypto" 
        :totals="totals[crypto]" 
        :earnings="earnings[crypto]"
        :frequency="frequency"
      />
    </tbody>
  </table>
</template>

<script setup>
import AssetAnalysis from "D#/dashboard/AssetAnalysis.vue";
defineProps({
  frequency: {
    type: String,
    required: true
  },

  totals: {
    type: Object,
    required: true
  },

  earnings: {
    type: Object,
    required: true
  }
});
</script>