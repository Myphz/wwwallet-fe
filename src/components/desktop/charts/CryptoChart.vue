<template>
  <section>
    <ChartOptions :crypto="crypto" :base="base" v-model:Base="currentBase" v-model:Crypto="currentCrypto" :dashboard="dashboard" :totals="totals" />
    <div class="stats">
      <span :class="'price ' + (isHigher ? 'green' : isHigher !== null ? 'red' : '')">
        <h2>{{ formatValue(price) }}</h2>
      </span>
      <span class="statsgroup">
        <span>24h Change</span>
        <span :class="pctChange.toString().startsWith('+') ? 'green' : pctChange.toString().startsWith('-') ? 'red' : ''">{{ formatPercentage(pctChange) }}%</span>
      </span>
      <span class="statsgroup">
        <span>24h High</span>
        <span class="green">{{ formatValue(high24) }}</span>
      </span>
      <span class="statsgroup">
        <span>24h Low</span>
        <span class="red">{{ formatValue(low24) }}</span>
      </span>
    </div>
    <div class="time stats noselect">
      <span v-for="(time, i) in TIMES" :key="time" :class="activeTime == i ? 'active-time' : ''" @click="activeTime = i">
        {{ time.toUpperCase() }}
      </span>
    </div>
    <div :class="dashboard ? 'chart-container-dashboard' : 'chart-container'">
      <CandlestickChart :crypto="currentCrypto" :base="currentBase" :interval="TIMES[activeTime]" dashboard />
    </div>
  </section>
</template>

<script setup>
import ChartOptions from "D#/charts/ChartOptions.vue";
import CandlestickChart from "D#/charts/CandlestickChart.vue";
import { TIMES } from "@/config/config.js";
import { computed, getCurrentInstance, ref, toRef, watch } from "vue";
import { formatValue, formatPercentage } from "@/helpers/formatNumber.helper";
import { calculatePercentage } from "@/helpers/getPrice.helper";
import { useCryptoStore } from "S#/crypto.store";
import Big from "@/helpers/big.helper";

const props = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  },

  totals: {
    type: Object,
    default: null
  },

  dashboard: {
    type: Boolean,
    default: false
  }
});

const { crypto, base, dashboard } = props;
const totals = toRef(props, "totals");

const currentBase = ref(base);
const currentCrypto = ref(crypto);

const activeTime = ref(0);
const { emit } = getCurrentInstance();

const store = useCryptoStore();

let price, pctChange, high24, low24;

const getValue = (crypto, where, key, multiplier) => {
  if (!multiplier) {
    const obj = where[crypto.value + currentBase.value];
    if (key) return obj?.[key] || 0;
    return obj || 0;
  }
  return Big(where[crypto.value + (currentCrypto.value === "TOTAL" ? currentBase.value : "")]?.[key] || 0).times(multiplier);
};

if (!dashboard) {
  price = computed(() => getValue(currentCrypto, store.prices, "c"));
  pctChange = computed(() => calculatePercentage(getValue(currentCrypto, store.prices)));
  high24 = computed(() => getValue(currentCrypto, store.prices, "h"));
  low24 = computed(() => getValue(currentCrypto, store.prices, "l"));
} else {
  const helper = key => {
    // If it's not "TOTAL", return the crypto current price * crypto quantity
    if (currentCrypto.value !== "TOTAL")
      return getValue(
        currentCrypto, totals.value, "totalQuantity", 
        getValue(currentCrypto, store.prices, key)
      );

    // Otherwise, do this for all the crypto in the wallet and return the sum
    const entries = Object.entries(totals.value);
    return entries.reduce(
      (prev, [value, { totalQuantity }]) => prev.plus( getValue({value}, store.prices, key, totalQuantity) ), 
      Big(0)
    );
  };

  price = computed(() => helper("c"));
  high24 = computed(() => helper("h"));
  low24 = computed(() => helper("l"));
  const open = computed(() => helper("o"));
  pctChange = computed(() => price.value.minus(open.value).div(price.value.eq(0) ? 1 : price.value).times(100));
}

const isHigher = ref(null);
watch(price, (newPrice, oldPrice) => {
  if (newPrice instanceof Big) return isHigher.value = newPrice.gt(oldPrice);
  isHigher.value = newPrice > oldPrice;
});

watch(currentCrypto, () => {
  emit("update:Crypto", currentCrypto.value);
});

watch(currentBase, () => {
  emit("update:Base", currentBase.value);
});
</script>

<style lang="sass" scoped>
  section
    background-color: $bg-dark
    border-radius: 1.5em

  h2
    font-weight: normal

  .chart-container
    height: 70vh
    width: 100%
    margin-bottom: 2em

  .chart-container-dashboard
    height: 34vh
    width: 100%

  .stats
    padding: 1em 4em 0 4em
    display: flex
    justify-content: flex-start
    gap: 2em

  .time
    color: $text-secondary
    font-weight: bold
    span
      cursor: pointer

  .active-time
    color: $text-primary

  .price
    padding: 0 1em 0 0
    border-right: 1px solid $text-primary
    font-weight: 550

  .statsgroup
    display: inline-flex
    flex-direction: column
    justify-content: center
</style>