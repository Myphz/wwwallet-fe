<template>
  <div class="main bg-dark nohover h4 transition">
    <div class="crypto align-center h2">
      <img
        :src="getIcon(crypto)"
        :alt="crypto"
        onerror="this.src='/icons/generic.svg'"
      />
      <span class="title">
        {{ store.tickerInfo?.[crypto]?.name || crypto }}
      </span>
      <span class="ticker">{{ crypto }}</span>
    </div>

    <div style="height: 6vh">
      <LineChart :crypto="crypto" :frequency="frequency" />
    </div>

    <div class="pad-1 t">
      <div class="space-between header">
        <span>Average Buy Price</span>
        <span>Current Price</span>
      </div>
      <div class="space-between margin-bottom">
        <span>{{ formatValue(totals.avgBuyPrice) }}</span>
        <span :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
          {{ formatValue(currentPrice) }}
        </span>
      </div>

      <div class="space-between header">
        <span>Average Sell Price</span>
        <span>Current Value</span>
      </div>
      <div class="space-between margin-bottom">
        <span>
          {{
            totals.avgSellPrice.eq(0) ? "N/A" : formatValue(totals.avgSellPrice)
          }}
        </span>
        <span :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
          {{ formatValue(currentValue) }}
        </span>
      </div>

      <div class="space-between header">
        <span>% Change</span>
        <span>Earnings</span>
      </div>
      <div class="space-between margin-bottom">
        <span
          v-if="!pctChange.eq(0)"
          :class="pctChange.gt(0) ? 'green' : 'red'"
        >
          {{ formatPercentage(pctChange) }}
        </span>
        <span v-else>N/A</span>

        <span
          v-if="!earnings.eq(0)"
          :class="earnings.s === -1 ? 'red' : 'green'"
        >
          {{ earnings.s === -1 ? "-" : "" }}{{ formatValue(earnings.abs()) }}
        </span>
        <span v-else>N/A</span>
      </div>
    </div>

    <div
      class="align-center justify-center arrow-cell bg-primary"
      style="height: 5vh"
      @click="open = !open"
    >
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </div>

    <div v-show="open">
      <TransactionsAnalysis
        :transactions="computedTransactions"
        :crypto="crypto"
        :currentValue="currentValue"
      />
    </div>
  </div>
</template>

<script setup>
import LineChart from "M#/charts/LineChart.mobile.vue";
import TransactionsAnalysis from "M#/dashboard/TransactionsAnalysis.mobile.vue";
import { ref, toRefs, watch, computed } from "vue";
import Big from "@/helpers/big.helper.js";
import { useCryptoStore } from "S#/crypto.store";
import { formatValue, formatPercentage } from "@/helpers/formatter.helper";
import { getFavPrice, getIcon } from "@/helpers/crypto.helper";
import { addEarnings } from "@/helpers/transactions.helper";
import { ANALYSIS_TIMES } from "@/config/config";

const props = defineProps({
  crypto: {
    type: String,
    required: true,
  },

  totals: {
    type: Object,
    required: true,
  },

  currentValue: {
    type: Big,
    required: true,
  },

  transactions: {
    type: Array,
    required: true,
  },

  frequency: {
    type: String,
    required: true,
  },
});

const { crypto, totals, currentValue, frequency, transactions } = toRefs(props);
const store = useCryptoStore();

let pastPrice = ref();
let end = ref();

const currentPrice = computed(() => getFavPrice(crypto.value, store.prices));

const computedTransactions = computed(() =>
  addEarnings(transactions.value, crypto.value, store.prices, {
    pastPrice: pastPrice.value,
    end: end.value,
    copy: true,
  })
);

const pctChange = computed(() => {
  // Weighted average
  let ret = Big(0);
  let totVal = Big(0);
  for (const transaction of computedTransactions.value) {
    if (transaction.earnings.eq(0)) continue;
    const val = Big(transaction.quantity).times(
      getFavPrice(transaction.base, store.prices)
    );
    totVal = totVal.plus(val);
    ret = ret.plus(transaction.change.times(val));
  }
  return totVal.eq(0) ? Big(0) : ret.div(totVal);
});

const earnings = computed(() => {
  let ret = Big(0);
  for (const transaction of computedTransactions.value) {
    ret = ret.plus(transaction.earnings);
  }
  return ret;
});

watch(frequency, async () => {
  if (frequency.value === "TOTAL") {
    pastPrice.value = undefined;
    end.value = undefined;
    return;
  }

  end.value = +new Date() - ANALYSIS_TIMES[frequency.value];
  pastPrice.value = await store.getPastPrices(
    end.value,
    crypto.value,
    computedTransactions.value
  );
});

const open = ref(false);

const isHigher = ref(null);
watch(currentPrice, (newPrice, oldPrice) => {
  if (newPrice instanceof Big) return (isHigher.value = newPrice.gt(oldPrice));
  isHigher.value = newPrice > oldPrice;
});
</script>

<style lang="sass" scoped>
.main
  margin-bottom: 2em
  border-radius: 1em

.ticker
  font-size: nth($font-sizes, 2)
  font-weight: 200

.title
  font-size: nth($font-sizes, 3)

.pad-1
  padding: 1em

.crypto
  border-bottom: 1px solid $text-secondary
  padding: .5em 1em
  margin-bottom: .5em

.arrow-cell
  border-radius: 0 0 1em 1em

.header
  font-weight: bold
  color: $text-secondary

.margin-bottom
  margin-bottom: .5em

img
  width: 32px
  height: 32px
  margin-right: .5em
  border-radius: 999rem
  background: white
</style>
