<template>
  <h4 v-if="!$route.params.isAuth" style="margin-bottom: 1em; font-weight: normal">
    <RouterLink to="/login" class="link">Login</RouterLink> or <RouterLink to="/register" class="link">Register</RouterLink> now to receive real-time updates
  </h4>
  <section v-if="!$route.params.isAuth || Object.keys(transactions).length">
    <AssetAnalysis 
      v-for="crypto in Object.keys(totals)" 
      :key="crypto" 
      :crypto="crypto" 
      :totals="totals[crypto]" 
      :currentValue="currentValues[crypto]"
      :transactions="transactions[crypto]"
      :frequency="frequency"
    />
  </section>
  <h3 
    v-if="$route.params.isAuth && !Object.keys(transactions).length" 
    style="font-weight: normal; padding: 1em; border-radius: .5em" 
    class="bg-dark nohover shadow"
  >
    No transactions registered yet...
  </h3>
</template>

<script setup>
import AssetAnalysis from "M#/dashboard/AssetAnalysis.mobile.vue";
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