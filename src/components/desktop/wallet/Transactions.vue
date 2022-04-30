<template>
  <table :class="'nohover ' + bgColor + ' ' + (shorter ? 'short ' : '')" v-if="(authStore.transactions?.[crypto] || transactions).length">
    <thead>
      <tr>
        <th v-if="withTicker">Token</th>
        <th>Pair</th>
        <th>Side</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Value</th>
        <th>Date</th>
        <th v-if="!withTicker && $route.params.isAuth"></th>
      </tr>
    </thead>
    <tbody>
      <Transaction 
        v-for="transaction in authStore.transactions?.[crypto] || transactions" 
        :key="transaction._id" 
        :crypto="crypto"
        :transaction="transaction" 
        :withTicker="withTicker" 
        :shorter="shorter" 
        :fontSize="fontSize" 
      />
    </tbody>
  </table>
  <div v-else-if="$route.params.isAuth" :class="'nohover ' + bgColor">
    <h4>No transactions registered for {{ crypto }} yet...</h4>
  </div>
  <div v-else :class="'nohover ' + bgColor">
    <h4><RouterLink to="/login">Login</RouterLink> or <RouterLink to="/register">Register</RouterLink> to record transactions</h4>
  </div>
</template>

<script setup>
import Transaction from "D#/wallet/Transaction.vue";
import { useAuthStore } from "S#/auth.store";
import { RouterLink } from "vue-router";

defineProps({
  crypto: {
    type: String,
    required: true
  },

  transactions: {
    type: Array,
    default: []
  },

  fontSize: {
    type: String,
    default: "h4"
  },

  bgColor: {
    type: String,
    default: "bg-dark"
  },

  withTicker: {
    type: Boolean,
    default: true
  },

  shorter: {
    type: Boolean,
    default: false
  }
});

const authStore = useAuthStore();
</script>

<style lang="sass" scoped>
  table
    border-radius: 1.5em

  .short
    th
      padding: .5em 1em

  div
    border-radius: .5em
    padding: 1.5em

  h4
    font-weight: normal

  a
    color: darken($text-primary, 15%)
    text-decoration: underline

</style>