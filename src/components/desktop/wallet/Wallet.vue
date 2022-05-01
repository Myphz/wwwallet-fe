<template>
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Avg Buy Price</th>
        <th>Avg Sell Price</th>
        <th>Quantity</th>
        <th>Value</th>
        <th>Total Earnings</th>
        <th>Total Change</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <WalletRow 
        v-for="crypto in Object.keys(transactions).filter(crypto => crypto.includes(search)).sort(byValue(currentValues))" 
        :key="crypto" 
        :crypto="crypto" 
        :transactions="transactions[crypto]"
        :totals="totals[crypto]"
        :currentValue="currentValues[crypto]"
        @request="value => request = value" 
      />
    </tbody>
  </table>
  <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" />
</template>

<script setup>
import WalletRow from "D#/wallet/WalletRow.vue";
import Popup from "U#/Popup.vue";
import { computed, ref, watch } from "vue";
import { byValue } from "@/helpers/sort.helper";
import { useAuthStore } from "S#/auth.store.js";
import { useCryptoStore } from "S#/crypto.store.js";
import { getDollarPrice } from "@/helpers/crypto.helper";
import { getStats, generateTransactions } from "@/helpers/transactions.helper";

defineProps({
  search: {
    type: String,
    required: true
  }
});

const authStore = useAuthStore();
const cryptoStore = useCryptoStore();

// Mock transactions if the user is not logged in
const transactions = ref(authStore.transactions);
if (!transactions.value) {
  transactions.value = {};
  const unwatch = watch(cryptoStore.prices, () => {
    transactions.value = generateTransactions(cryptoStore);
    unwatch();
  })
};

const totals = computed(() => getStats(transactions.value, cryptoStore.prices));
const currentValues = computed(() => {
  const ret = {};
  for (const [crypto, { totalQuantity }] of Object.entries(totals.value)) {
    ret[crypto] = totalQuantity.times(getDollarPrice(crypto, cryptoStore.prices))
  };

  return ret;
});

const request = ref({success: null, msg: ""});
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

</style>