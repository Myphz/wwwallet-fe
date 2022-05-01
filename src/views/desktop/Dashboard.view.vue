<template>
  <section>
    <h1>Wallet Analysis</h1>
    <div class="container">
      <AssetsChart 
        :totals="totals"
        :currentValues="currentValues"
        :earnings="earnings"
      />
      <CryptoChart 
        class="chart" 
        crypto="TOTAL"
        base="USDT" 
        :totals="totals"
        :transactions="transactions"
        dashboard 
      />
    </div>
  </section>

  <section>
    <header class="space-between">
      <h1>Assets Analysis</h1>
      <Select :options="Object.keys(ANALYSIS_TIMES)" class="h1" :withIcon="false" v-model="frequency" />
    </header>
    <div class="bg-dark nohover assets-section shadow">
      <AssetsAnalysis :frequency="frequency" :totals="totals" :currentValues="currentValues" :transactions="transactions" />
    </div>
  </section>

  <section>
    <h1>Earnings Analysis</h1>
    <EarningsChart :earnings="earnings" />
  </section>
 
</template>

<script setup>
import AssetsChart from "D#/charts/AssetsChart.vue";
import CryptoChart from "D#/charts/CryptoChart.vue";
import EarningsChart from "D#/charts/EarningsChart.vue";
import Select from "U#/Select.vue";
import AssetsAnalysis from "D#/dashboard/AssetsAnalysis.vue";

import { ANALYSIS_TIMES } from "@/config/config";
import { useAuthStore } from "S#/auth.store";
import { useCryptoStore } from "S#/crypto.store";
import Big from "@/helpers/big.helper";
import { computed, ref, watch } from "vue";
import { getDollarPrice } from "@/helpers/crypto.helper";
import { addEarnings } from "@/helpers/transactions.helper";
import { generateTransactions } from "@/helpers/transactions.helper";

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
const totals = computed(() => {
  const ret = {}; 
  for (const [crypto, transactions] of Object.entries(authTransactions.value)) {
    ret[crypto] = { 
      totalQuantity: Big(0), 
      buyQuantity: Big(0), 
      sellQuantity: Big(0), 
      avgBuyPrice: null, 
      avgSellPrice: null 
    };
  
    let buyPriceSum = Big(0);
    let sellPriceSum = Big(0);

    for (const transaction of transactions) {
      if (transaction.isBuy) {
        ret[crypto].totalQuantity = ret[crypto].totalQuantity.plus(transaction.quantity);
        ret[crypto].buyQuantity = ret[crypto].buyQuantity.plus(transaction.quantity);
        buyPriceSum = buyPriceSum.plus( Big(transaction.price).times(transaction.quantity).times(getDollarPrice(transaction.base, cryptoStore.prices)) );
      } else {
        ret[crypto].totalQuantity = ret[crypto].totalQuantity.minus(transaction.quantity);
        ret[crypto].sellQuantity= ret[crypto].sellQuantity.plus(transaction.quantity);
        sellPriceSum = sellPriceSum.plus( Big(transaction.price).times(transaction.quantity).times(getDollarPrice(transaction.base, cryptoStore.prices)) );
      }
    };

    ret[crypto].avgBuyPrice = buyPriceSum.div(ret[crypto].buyQuantity);
    ret[crypto].avgSellPrice = ret[crypto].sellQuantity.eq(0) ? Big(0) : sellPriceSum.div(ret[crypto].sellQuantity);
  }

  return ret;
});

// Computed variable to store an object with the following format:
// { [crypto]: [crypto current value (real time) in user's favorite currency] }
const currentValues = computed(() => {
  const ret = {};
  for (const [crypto, { totalQuantity }] of Object.entries(totals.value)) {
    ret[crypto] = totalQuantity.times(getDollarPrice(crypto, cryptoStore.prices))
  };

  return ret;
});

// Add "earnings" field to each transaction
const transactions = computed(() => addEarnings(authTransactions.value, cryptoStore.prices));

// Computed variable to store an object with the following format:
// { [crypto]: [crypto's earnings in user's favorite currency] }
const earnings = computed(() => {
  const ret = {};
  for (const [crypto, trans] of Object.entries(transactions.value || {})) {
    ret[crypto] = Big(0);
    for (const { base, earnings } of trans) {
      ret[crypto] = ret[crypto].plus(earnings.times(getDollarPrice(base, cryptoStore.prices)));
    }
  };

  return ret;
});
</script>

<style lang="sass" scoped>
  h1
    margin-bottom: .25em
    
  .container
    display: flex
    align-items: stretch
    margin-bottom: 2em

  .chart
    flex: 1

  .assets-section
    border-radius: 1.5em
    margin-bottom: 2em
    padding: 1.5em
</style>
