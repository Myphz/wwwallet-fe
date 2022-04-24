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
        <th></th>
      </tr>
    </thead>
    <tbody>
      <Transaction 
        v-for="transaction in authStore.transactions?.[crypto] || []" 
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
import { ref, toRefs, watch } from "vue";
import { useAuthStore } from "S#/auth.store";

const props = defineProps({
  crypto: {
    type: String,
    required: true
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

const isLogged = ref(await authStore.getTransactions());
watch(crypto, async () => {
  isLogged.value = await authStore.getTransactions();
});

</script>

<style lang="sass" scoped>
  table
    border-radius: 1.5em

  .short
    th
      padding: .5em 1em

</style>