<template>
  <section>
    <ChartOptions :crypto="crypto" :base="base" v-model:Base="currentBase" v-model:Crypto="currentCrypto" />
    <div class="stats">
      <span :class="'price ' + (isHigher ? 'green' : isHigher !== null ? 'red' : '')">
        <h2>{{ price }}</h2>
      </span>
      <span class="statsgroup">
        <span>24h Change</span>
        <span :class="pctChange.startsWith('+') ? 'green' : pctChange.startsWith('-') ? 'red' : ''">{{ pctChange }}</span>
      </span>
      <span class="statsgroup">
        <span>24h High</span>
        <span class="green">{{ high24 }}</span>
      </span>
      <span class="statsgroup">
        <span>24h Low</span>
        <span class="red">{{ low24 }}</span>
      </span>
    </div>
    <div class="time stats noselect">
      <span v-for="(time, i) in TIMES" :key="time" :class="activeTime == i ? 'active-time' : ''" @click="activeTime = i">
        {{ time.toUpperCase() }}
      </span>
    </div>
    <div :class="dashboard ? 'chart-container-dashboard' : 'chart-container'">
      <CandlestickChart :crypto="currentCrypto" :base="currentBase" :interval="TIMES[activeTime]" />
    </div>
  </section>
</template>

<script setup>
import ChartOptions from "D#/charts/ChartOptions.vue";
import CandlestickChart from "D#/charts/CandlestickChart.vue";
import { TIMES } from "@/config/config.js";
import { computed, getCurrentInstance, ref, watch } from "vue";
import { formatValue, formatPercentage } from "@/helpers/formatNumber.helper";
import { calculatePercentage } from "@/helpers/getPrice.helper";
import { useCryptoStore } from "S#/crypto.store";

const { crypto, base } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  },

  dashboard: {
    type: Boolean,
    default: false
  }
});

const currentBase = ref(base);
const currentCrypto = ref(crypto);

const activeTime = ref(0);
const { emit } = getCurrentInstance();

const store = useCryptoStore();

const price = computed(() => formatValue(store.prices[currentCrypto.value + currentBase.value]?.c));
const pctChange = computed(() => formatPercentage(calculatePercentage(store.prices[currentCrypto.value + currentBase.value])));
const high24 = computed(() => formatValue(store.prices[currentCrypto.value + currentBase.value]?.h));
const low24 = computed(() => formatValue(store.prices[currentCrypto.value + currentBase.value]?.l));

const isHigher = ref(null);
watch(price, (newPrice, oldPrice) => {
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