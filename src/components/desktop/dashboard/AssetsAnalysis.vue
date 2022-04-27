<template>
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Average Buy Price</th>
        <th>Average Sell Price</th>
        <th>Earnings</th>
        <th>Change</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <AssetAnalysis v-for="crypto in Object.keys(totals)" :key="crypto" :crypto="crypto" :totals="totals[crypto]" :earnings="earnings[crypto]" />
    </tbody>
  </table>
</template>

<script setup>
import AssetAnalysis from "D#/dashboard/AssetAnalysis.vue";
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

  earnings: {
    type: Object,
    required: true
  }
});

const { frequency, totals, earnings } = toRefs(props);
</script>