<template>
  <table :class="'nohover ' + bgColor" v-if="(authStore.transactions?.[crypto] || transactions).length">
    <thead>
      <tr>
        <th v-if="withTicker">Token</th>
        <th>Side</th>
        <th>Quantity</th>
        <th>Price</th>
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
import Transaction from "M#/wallet/Transaction.mobile.vue";
import { toRefs } from "vue";
import { useAuthStore } from "S#/auth.store";

const props = defineProps({
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
  }
});

const { crypto } = toRefs(props);
const authStore = useAuthStore();
</script>

<style lang="sass" scoped>
  table
    border-radius: 1.5em

  th
    padding: 1em .5em
    text-align: left
    font-weight: bold

  th:first-of-type, th:last-of-type
    padding-left: 2em

  div
    border-radius: .5em
    padding: 1.5em

  h4
    font-weight: normal

  a
    color: darken($text-primary, 15%)
    text-decoration: underline

</style>