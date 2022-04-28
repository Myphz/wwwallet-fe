<template>
  <div class="main bg-dark nohover h4 transition">
    <div class="crypto align-center h2">
      <img 
        :src="getCryptoIcon(crypto)" 
        :alt="crypto"
        onerror="this.src='/src/assets/icons/generic.svg'"
      >
      <span class="title">{{ store.tickerInfo?.[crypto]?.name || crypto }}</span>
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
        <span>${{ formatValue(totals.avgBuyPrice) }}</span>
        <span :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">${{ formatValue(currentPrice) }}</span>
      </div>

      <div class="space-between header">
        <span>Average Sell Price</span>
        <span>Current Value</span>
      </div>
      <div class="space-between margin-bottom">
        <span>${{ formatValue(totals.avgSellPrice) }}</span>
        <span :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">${{ formatValue(currentValues) }}</span>
      </div>

      <div class="space-between header">
        <span>% Change</span>
        <span>Earnings</span>
      </div>
      <div class="space-between margin-bottom">
        <span :class="parseFloat(pctChange) > 0 ? 'green' : parseFloat(pctChange) < 0 ? 'red' : ''">{{ formatPercentage(pctChange) }}</span>
        <span :class="earnings.s === -1 ? 'red' : earnings.eq(0) ? '' : 'green'">{{ earnings.s === -1 ? "-" : "" }}${{ formatValue(earnings.abs()) }}</span>
      </div>
    </div>

    <div class="align-center justify-center arrow-cell bg-primary" style="height: 5vh" @click="open = !open">
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </div>

    <div :class="'transactions-row ' + (open ? 'row-open' : '')">
      <TransactionsAnalysis />
    </div>
  </div>
</template>

<script setup>
import LineChart from "M#/charts/LineChart.mobile.vue";
import TransactionsAnalysis from "M#/dashboard/TransactionsAnalysis.mobile.vue";
import { ref, toRefs, watch } from "vue";
import getCryptoIcon from "@/helpers/getCryptoIcon.helper.js";
import Big from "@/helpers/big.helper.js";
import { useCryptoStore } from "S#/crypto.store";
import { formatValue, formatPercentage } from "@/helpers/formatNumber.helper";
import { computed } from "@vue/reactivity";
import { getDollarPrice } from "@/helpers/getPrice.helper";

const props = defineProps({
  crypto:  {
    type: String,
    required: true
  },

  totals: {
    type: Object,
    required: true
  },

  currentValues: {
    type: Big,
    required: true
  },

  earnings: {
    type: Big,
    required: true
  },

  frequency: {
    type: String,
    required: true
  }
});

const { crypto, totals, earnings, frequency } = toRefs(props);
const store = useCryptoStore();

const currentPrice = computed(() => getDollarPrice(crypto.value, store.prices));

const pctChange = computed(() => {
  if (!currentPrice.value) return 0;
  return Big(currentPrice.value).minus(totals.value.avgBuyPrice).div(currentPrice.value).times(100);
});

const open = ref(false);

const isHigher = ref(null);
watch(currentPrice, (newPrice, oldPrice) => {
  if (newPrice instanceof Big) return isHigher.value = newPrice.gt(oldPrice);
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

  .transactions-row
    display: none

  .row-open
    display: block

  img
    width: 32px
    height: 32px
    margin-right: .5em
      
</style>