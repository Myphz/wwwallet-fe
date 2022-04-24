<template>
  <table :class="'nohover ' + bgColor">
    <thead>
      <tr>
        <th v-if="withTicker">Token</th>
        <th>Side</th>
        <th>Quantity</th>
        <th>Price</th>
        <th v-if="!withTicker"></th>
      </tr>
    </thead>
    <tbody>
      <Transaction 
        v-for="transaction in authStore.transactions?.[crypto] || []" 
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

  th
    padding: 1em .5em
    text-align: left
    font-weight: bold

  th:first-of-type, th:last-of-type
    padding-left: 2em

</style>