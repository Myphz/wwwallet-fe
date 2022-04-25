<template>
  <table :class="'nohover ' + bgColor">
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

</style>