<template>
  <table :class="'nohover ' + bgColor + ' ' + (shorter ? 'short ' : '')">
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
</template>

<script setup>
import Transaction from "D#/wallet/Transaction.vue";
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
  },

  shorter: {
    type: Boolean,
    default: false
  }
});

const { crypto } = toRefs(props);
const authStore = useAuthStore();
</script>

<style lang="sass" scoped>
  table
    border-radius: 1.5em

  .short
    th
      padding: .5em 1em

</style>