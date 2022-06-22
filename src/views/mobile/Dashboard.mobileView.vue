<template>
  <section class="analysis-section">
    <h1>Wallet Analysis</h1>
    <AssetsChart
      :totals="totals"
      :currentValues="currentValues"
      :earnings="earnings"
    />
    <CryptoChart
      crypto="TOTAL"
      base="USDT"
      :totals="totals"
      :transactions="transactions"
      dashboard
    />
  </section>
  <section class="analysis-section">
    <header class="assets-header">
      <h1>Assets Analysis</h1>
      <Select :options="Object.keys(ANALYSIS_TIMES)" class="h2 with-border" :withIcon="false" v-model="frequency" />
    </header>
    <div>
      <AssetsAnalysis :frequency="frequency" :totals="totals" :currentValues="currentValues" :transactions="transactions" />
    </div>
  </section>
  <section class="analysis-section">
    <h1>Earnings Analysis</h1>
    <EarningsChart :earnings="earnings" />
  </section>
</template>

<script setup>
import AssetsChart from "M#/charts/AssetsChart.mobile.vue";
import CryptoChart from "M#/charts/CryptoChart.mobile.vue";
import EarningsChart from "M#/charts/EarningsChart.mobile.vue";
import Select from "U#/Select.vue";
import AssetsAnalysis from "M#/dashboard/AssetsAnalysis.mobile.vue";

import { ANALYSIS_TIMES } from "@/config/config";
import { useAuthStore } from "S#/auth.store";
import { useCryptoStore } from "S#/crypto.store";
import Big from "@/helpers/big.helper";
import { computed, onMounted, ref, watch } from "vue";
import { getFavPrice } from "@/helpers/crypto.helper";
import { addEarnings } from "@/helpers/transactions.helper";
import { generateTransactions, getStats } from "@/helpers/transactions.helper";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const cryptoStore = useCryptoStore();
const frequency = ref("TOTAL");

// Mock transactions if the user is not logged in
const authTransactions = ref(authStore.transactions);
if (!authTransactions.value) {
  authTransactions.value = {};
  const unwatch = watch(cryptoStore.prices, () => {
    authTransactions.value = generateTransactions(cryptoStore);
    unwatch();
  })
};

// Add "earnings" field to each transaction
const transactions = computed(() => addEarnings(authTransactions.value, cryptoStore.prices));

// Computed variable to store some transaction statistics.
// Example format:
// {
//   "BTC": {
//     "totalQuantity": "5",
//     "buyQuantity": "5",
//     "sellQuantity": "0",
//     "avgBuyPrice": "39577.01",
//     "avgSellPrice": "0"
//   },

//   "ETH": {... }
// }
const totals = computed(() => getStats(transactions.value, cryptoStore.prices));

// Computed variable to store an object with the following format:
// { [crypto]: [crypto current value (real time) in user's favorite currency] }
const currentValues = computed(() => {
  const ret = {};
  for (const [crypto, { totalQuantity }] of Object.entries(totals.value)) {
    ret[crypto] = totalQuantity.times(getFavPrice(crypto, cryptoStore.prices))
  };

  return ret;
});

// Computed variable to store an object with the following format:
// { [crypto]: [crypto's earnings in user's favorite currency] }
const earnings = computed(() => {
  const ret = {};
  for (const [crypto, trans] of Object.entries(transactions.value || {})) {
    ret[crypto] = Big(0);
    for (const { base, earnings } of trans) {
      ret[crypto] = ret[crypto].plus(earnings);
    }
  };

  return ret;
});

// On android mode, if the route is "/" redirect to /dashboard
onMounted(() => {
  const router = useRouter();
  if (router.currentRoute.value.path === "/") router.replace("/dashboard");
});
</script>

<style lang="sass" scoped>
  h1
    margin-bottom: .25em

  .analysis-section
    margin-bottom: 3em

  .assets-header
    margin-bottom: 1.5em

  .with-border
    border-bottom: 2px solid $primary

</style>