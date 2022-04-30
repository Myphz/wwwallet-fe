<template>
  <table v-if="!$route.params.isAuth || Object.keys(transactions).length" class="bg-dark nohover shadow">
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
        :currentValue="currentValues[crypto]"
        :transactions="transactions[crypto]"
        :frequency="frequency"
      />
    </tbody>
  </table>
  <h3 v-if="$route.params.isAuth && !Object.keys(transactions).length" style="font-weight: normal">No transactions registered yet...</h3>
  <h4 v-if="!$route.params.isAuth" style="margin-top: 1em; white-space: nowrap; font-weight: normal">
    <RouterLink to="/login" class="link">Login</RouterLink> or <RouterLink to="/register" class="link">Register</RouterLink> now to receive real-time updates
  </h4>
</template>

<script setup>
import AssetAnalysis from "D#/dashboard/AssetAnalysis.vue";
import { RouterLink } from "vue-router";

defineProps({
  frequency: {
    type: String,
    required: true
  },

  totals: {
    type: Object,
    required: true
  },

  transactions: {
    type: Object,
    required: true
  },

  currentValues: {
    type: Object,
    required: true
  }
});
</script>