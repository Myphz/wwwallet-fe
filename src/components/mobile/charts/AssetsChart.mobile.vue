<template>
  <section class="shadow">
    <div class="main-info">
      <h4 class="text-secondary">TOTAL ASSET VALUE</h4>
      <h2 :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">{{ formatValue(total) }}</h2>
    </div>
    <div class="chart-container">
      <PieChart :totals="totals" :currentValues="currentValues" />
    </div>
    <div class="main-info">
      <h4 class="text-secondary">TOTAL EARNINGS</h4>
      <h2 :class="totalEarnings.s === -1 ? 'red' : 'green'">{{ formatValue(totalEarnings) }}</h2>
    </div>
  </section>
</template>

<script setup>
import PieChart from "M#/charts/PieChart.mobile.vue";
import { ref, toRefs, watch, computed } from "vue";
import { formatValue } from "@/helpers/formatter.helper";
import Big from "@/helpers/big.helper";

const props = defineProps({
  totals: {
    type: Object,
    required: true,
  },

  currentValues: {
    type: Object,
    required: true,
  },

  earnings: {
    type: Object,
    required: true
  }
});

const { totals, currentValues, earnings } = toRefs(props);
const total = computed(() => Object.values(currentValues.value).reduce((prev, curr) => prev.plus(curr), Big(0)));
const totalEarnings = computed(() => Object.values(earnings.value).reduce((prev, curr) => prev.plus(curr), Big(0)));

const isHigher = ref(null);
watch(total, (newTotal, oldTotal) => {
  isHigher.value = newTotal.gte(oldTotal);
});
</script>

<style lang="sass" scoped>
  section
    height: 45vh
    padding: 2em
    background-color: $bg-dark
    border-radius: 1.5em
    margin-bottom: 2em

  .chart-container
    height: 30vh

  .main-info
    display: flex
    flex-direction: column
    align-items: center
    h2
      font-weight: 550
</style>