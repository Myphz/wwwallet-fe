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
      dashboard 
    />
  </section>
  <section class="analysis-section">
    <header class="assets-header">
      <h1>Assets Analysis</h1>
      <Select :options="Object.keys(ANALYSIS_TIMES)" class="h2 with-border" :withIcon="false"  v-model="frequency" />
    </header>
    <div>
      <AssetsAnalysis :frequency="frequency" :totals="totals" :currentValues="currentValues" />
    </div>
  </section>
  <section class="analysis-section">
    <h1>Earnings Analysis</h1>
    <EarningsChart />
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
import { computed, ref } from "vue";
import { getDollarPrice } from "@/helpers/crypto.helper";

const authStore = useAuthStore();
const cryptoStore = useCryptoStore();
const frequency = ref("TOTAL");

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
  for (const [crypto, transactions] of Object.entries(authStore.transactions)) {
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
        buyPriceSum = buyPriceSum.plus( Big(transaction.price).times(transaction.quantity) );
      } else {
        ret[crypto].totalQuantity = ret[crypto].totalQuantity.minus(transaction.quantity);
        ret[crypto].sellQuantity= ret[crypto].sellQuantity.plus(transaction.quantity);
        sellPriceSum = sellPriceSum.plus( Big(transaction.price).times(transaction.quantity) );
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

// Computed variable to store an object with the following format:
// { [crypto]: [crypto's earnings in user's favorite currency] }
const earnings = computed(() => {
  const ret = {};
  for (const [crypto, stats] of Object.entries(totals.value)) {
    const oldValue = stats.totalQuantity.times(stats.avgBuyPrice);
    const soldValue = stats.sellQuantity.times( stats.avgSellPrice.minus(stats.avgBuyPrice) );
    ret[crypto] = currentValues.value && currentValues.value[crypto].minus(oldValue).plus(soldValue);
  };

  return ret;
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