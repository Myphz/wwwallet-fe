<template>
  <tr class="h4 bg-dark transition" @click="open = !open">
    <td class="align-center" id="chart">
      <img
        :src="getIcon(crypto)"
        :alt="crypto"
        onerror="this.src='/icons/generic.svg'"
      />

      <div>
        <span class="title">
          {{ store.tickerInfo?.[crypto]?.name || crypto }}
        </span>
        <span class="ticker">{{ crypto }}</span>
        <div id="chart" :style="'height: ' + chartHeight">
          <LineChart
            v-if="chartHeight != '100%'"
            :crypto="crypto"
            :frequency="frequency"
          />
        </div>
      </div>
    </td>

    <td>{{ formatValue(totals.avgBuyPrice) }}</td>
    <td>
      {{ totals.avgSellPrice.eq(0) ? "N/A" : formatValue(totals.avgSellPrice) }}
    </td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
      {{ formatValue(currentPrice) }}
    </td>
    <td v-if="!earnings.eq(0)" :class="earnings.s === -1 ? 'red' : 'green'">
      {{ earnings.s === -1 ? "-" : "" }}{{ formatValue(earnings.abs()) }}
    </td>
    <td v-else>N/A</td>

    <td v-if="!pctChange.eq(0)" :class="pctChange.gt(0) ? 'green' : 'red'">
      {{ formatPercentage(pctChange) }}
    </td>
    <td v-else>N/A</td>

    <td class="arrow-cell">
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </td>
  </tr>
  <tr class="transactions-row" v-show="open" style="cursor: default">
    <td colspan="7">
      <TransactionsAnalysis
        :transactions="computedTransactions"
        :crypto="crypto"
        :currentValue="currentValue"
      />
    </td>
  </tr>
</template>

<script setup>
import LineChart from "D#/charts/LineChart.vue";
import TransactionsAnalysis from "D#/dashboard/TransactionsAnalysis.vue";
import { onMounted, ref, toRefs, watch, computed } from "vue";
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
// Initial height of the cell. It needs to be modified to make the echarts library work by setting an explicit amount in pixels
const chartHeight = ref("100%");
// Hook to convert the chart cell height to pixels (to make echarts library work, as the height needs to be explicit)
onMounted(() => {
  // Get the cell element
  const element = document.getElementById("chart");
  // Get the style element
  const style = getComputedStyle(element);
  // Calculate the height by subtracting the element height to the padding top and bottom
  chartHeight.value =
    element.clientHeight -
    parseFloat(style.paddingTop) -
    parseFloat(style.paddingBottom) +
    "px";
});

const isHigher = ref(null);
watch(currentPrice, (newPrice, oldPrice) => {
  if (newPrice instanceof Big) return (isHigher.value = newPrice.gt(oldPrice));
  isHigher.value = newPrice > oldPrice;
});
</script>

<style lang="sass" scoped>
img
  width: 48px
  height: 48px
  margin-right: 1em
  border-radius: 999rem
  background: white

tr
  border-bottom: 1px solid $text-secondary
  cursor: pointer

td
  padding: .25em 1em

.arrow-cell
  text-align: right

.transactions-row
  background-color: darken($bg-base, 2%)
</style>
