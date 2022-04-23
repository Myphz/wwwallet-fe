<template>
  <section>
    <ChartOptions :crypto="crypto" :base="base" v-model:Base="currentBase" v-model:Crypto="currentCrypto" />
    <div class="stats">
      <span :class="'price ' + (isHigher ? 'green' : isHigher !== null ? 'red' : '')">
        <h3>{{ price }}</h3>
      </span>
      <span class="statsgroup">
        <span>Change</span>
        <span :class="pctChange.startsWith('+') ? 'green' : pctChange.startsWith('-') ? 'red' : ''">{{ pctChange }}</span>
      </span>
      <span class="statsgroup">
        <span>High</span>
        <span class="green">{{ high24 }}</span>
      </span>
      <span class="statsgroup">
        <span>Low</span>
        <span class="red">{{ low24 }}</span>
      </span>
    </div>
    <div class="stats time noselect">
      <span v-for="(time, i) in TIMES" :key="time" :class="activeTime == i ? 'active-time' : ''" @click="activeTime = i">
        {{ time.toUpperCase() }}
      </span>
    </div>
    <div class="chart-container">
      <CandlestickChart :crypto="currentCrypto" :base="currentBase" :interval="TIMES[activeTime]" />
    </div>
  </section>
</template>


<script setup>
import ChartOptions from "M#/charts/ChartOptions.mobile.vue";
import CandlestickChart from "M#/charts/CandlestickChart.mobile.vue";
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

watch(currentBase, () => {
  emit("update:modelValue", currentBase.value);
});
</script>

<style lang="sass" scoped>
  section
    background-color: $bg-dark
    border-radius: 1.5em

  .chart-container
    height: 60vh
    margin-bottom: 1em

  h3
    font-weight: normal

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

  .statsgroup
    display: inline-flex
    flex-direction: column
    justify-content: center
</style>