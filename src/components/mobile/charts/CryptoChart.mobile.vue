<template>
  <section class="shadow">
    <ChartOptions 
      :crypto="crypto" 
      :base="base" 
      v-model:Crypto="currentCrypto" 
      @update:Crypto="$emit('update:Crypto', currentCrypto)"
      v-model:Base="currentBase" 
      @update:Base="$emit('update:Base', currentBase)"
      :dashboard="dashboard" 
      :totals="totals" 
    />
    <div class="stats">
      <span :class="'price ' + (isHigher ? 'green' : isHigher !== null ? 'red' : '')">
        <h3>{{ formatValue(price, null, true) }}</h3>
      </span>
      <span class="statsgroup">
        <span>Change</span>
        <span :class="parseFloat(pctChange) > 0 ? 'green' : parseFloat(pctChange) < 0 ? 'red' : ''">{{ formatPercentage(pctChange) }}</span>
      </span>
      <span class="statsgroup">
        <span>High</span>
        <span class="green">{{ formatValue(high24, null, true) }}</span>
      </span>
      <span class="statsgroup">
        <span>Low</span>
        <span class="red">{{ formatValue(low24, null, true) }}</span>
      </span>
    </div>
    <div class="stats time noselect">
      <span v-for="(time, i) in TIMES" :key="time" :class="activeTime == i ? 'active-time' : ''" @click="activeTime = i">
        {{ time.toUpperCase() }}
      </span>
    </div>
    <div class="chart-container">
      <CandlestickChart :crypto="currentCrypto" :base="currentBase" :interval="TIMES[activeTime]" :totals="totals" :transactions="transactions" @empty.once="empty = true" />
      <h2 v-if="empty && $route.params.isAuth" class="note shadow">Nothing to show yet...</h2>
      <h2 v-else-if="empty" class="note shadow">
        <RouterLink to="/login" class="link">Login</RouterLink> or <RouterLink to="/register" class="link">Register</RouterLink> now<br>to check your wallet
      </h2>
    </div>
  </section>
</template>


<script setup>
import ChartOptions from "M#/charts/ChartOptions.mobile.vue";
import CandlestickChart from "M#/charts/CandlestickChart.mobile.vue";
import { TIMES } from "@/config/config.js";
import { computed, ref, toRef, watch } from "vue";
import { formatValue, formatPercentage } from "@/helpers/formatter.helper";
import { calculatePercentage } from "@/helpers/crypto.helper";
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

  transactions: {
    type: [Object, null],
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
const store = useCryptoStore();

const empty = ref(false);
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
  pctChange = computed(() => !price.value || price.value.minus(open.value).div(price.value.eq(0) ? 1 : price.value).times(100));
}

const isHigher = ref(null);
watch(price, (newPrice, oldPrice) => {
  if (newPrice instanceof Big) return isHigher.value = newPrice.gt(oldPrice);
  isHigher.value = newPrice > oldPrice;
});
</script>

<style lang="sass" scoped>
  section
    background-color: $bg-dark
    border-radius: 1.5em

  .chart-container
    position: relative
    height: 55vh
    margin-bottom: 1em

  .stats
    padding: .5em 2em 0 2em
    display: flex
    font-weight: 550
    justify-content: flex-start
    gap: 1em

  .time
    color: $text-secondary
    font-weight: bold
    gap: 2em
    margin-bottom: 1em
    span
      cursor: pointer

  .active-time
    color: $text-primary

  .price
    padding: 0 1em 0 0
    border-right: 1px solid $text-primary
    *
      font-weight: normal

  .statsgroup
    display: inline-flex
    flex-direction: column
    justify-content: center

  .note
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center
    background-color: $bg-base
    border-radius: .25em
    padding: .5em
    white-space: nowrap
    opacity: .9
</style>