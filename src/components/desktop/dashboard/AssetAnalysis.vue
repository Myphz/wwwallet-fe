<template>
  <tr class="h4 bg-dark transition" @click="open = !open">
    <td class="align-center" id="chart">
      <img 
        :src="getCryptoIcon(crypto)" 
        :alt="crypto"
        onerror="this.src='/src/assets/icons/generic.svg'"
      >

      <div>
        <span class="title">{{ store.tickerInfo?.[crypto]?.name || crypto }}</span>
        <span class="ticker">{{ crypto }}</span>
        <div id="chart" :style="'height: ' + chartHeight">
          <LineChart v-if="chartHeight != '100%'" :crypto="crypto" :frequency="frequency" />
        </div>
      </div>
    </td>
    
    <td>${{ formatValue(totals.avgBuyPrice) }}</td>
    <td>${{ formatValue(totals.avgSellPrice) }}</td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">${{ formatValue(currentPrice) }}</td>
    <td :class="earnings.s === -1 ? 'red' : earnings.eq(0) ? '' : 'green'">{{ earnings.s === -1 ? "-" : "" }}${{ formatValue(earnings.abs()) }}</td>
    <td :class="parseFloat(pctChange) > 0 ? 'green' : parseFloat(pctChange) < 0 ? 'red' : ''">{{ formatPercentage(pctChange) }}</td>
    <td class="arrow-cell">
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </td>
  </tr>
  <tr :class="'transactions-row ' + (open ? 'row-open' : '')">
    <td colspan="7">
      <TransactionsAnalysis />
    </td>
  </tr>
</template>

<script setup>
import LineChart from "D#/charts/LineChart.vue";
import TransactionsAnalysis from "D#/dashboard/TransactionsAnalysis.vue";
import { onMounted, ref, toRefs, watch } from "vue";
import getCryptoIcon from "@/helpers/getCryptoIcon.helper.js";
import Big from "@/helpers/big.helper.js";
import { useCryptoStore } from "S#/crypto.store";
import { formatValue, formatPercentage } from "@/helpers/formatNumber.helper";
import { computed } from "@vue/reactivity";
import { getDollarPrice } from "@/helpers/getPrice.helper";
import { getPastStats } from "@/helpers/getPastQuantity.helper";
import { ANALYSIS_TIMES } from "@/config/config";

const props = defineProps({
  crypto:  {
    type: String,
    required: true
  },

  totals: {
    type: Object,
    required: true
  },

  currentValue: {
    type: Big,
    required: true
  },

  transactions: {
    type: Object,
    required: true
  },

  frequency: {
    type: String,
    required: true
  }
});

const { crypto, totals, currentValue, frequency, transactions } = toRefs(props);
const store = useCryptoStore();

let avgBuyPrice = totals.value.avgBuyPrice;
const currentPrice = computed(() => getDollarPrice(crypto.value, store.prices));
const pctChange = computed(() => {
  if (!currentPrice.value) return 0;
  return Big(currentPrice.value).minus(avgBuyPrice).div(avgBuyPrice).times(100);
});

const earnings = computed(() => {
  let totalQuantity, sellQuantity, avgSellPrice; 
  
  if (frequency.value === "TOTAL") {
    ({ totalQuantity, sellQuantity, avgSellPrice, avgBuyPrice } = totals.value);
  } else {
    ({ totalQuantity, sellQuantity, avgSellPrice } = getPastStats(+new Date() - ANALYSIS_TIMES[frequency.value], transactions.value));
  };

  if (totalQuantity.eq(0)) return Big(0);
  const oldValue = totalQuantity.times(avgBuyPrice)
  const soldValue = sellQuantity.times( avgSellPrice.minus(avgBuyPrice) );
  return currentValue.value && currentValue.value.minus(oldValue).plus(soldValue);
});

watch(frequency, async () => {
  if (frequency.value === "TOTAL") return avgBuyPrice = totals.value.avgBuyPrice;
  avgBuyPrice = await store.getPastPrice(+new Date() - ANALYSIS_TIMES[frequency.value], crypto.value);
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
  chartHeight.value = (element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)) + "px";
});

const isHigher = ref(null);
watch(currentPrice, (newPrice, oldPrice) => {
  if (newPrice instanceof Big) return isHigher.value = newPrice.gt(oldPrice);
  isHigher.value = newPrice > oldPrice;
});
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px
    margin-right: 1em

  tr
    border-bottom: 1px solid $text-secondary
    cursor: pointer

  td
    padding: .25em 1em
  
  .arrow-cell
    text-align: right

  .transactions-row
    background-color: darken($bg-base, 2%)
    display: none

  .row-open
    display: table-row
      
</style>