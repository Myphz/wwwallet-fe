<template>
  <section>
    <div class="main-info">
      <h4 class="text-secondary">TOTAL ASSET VALUE</h4>
      <h2 :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">${{ total.toFormat(2) }}</h2>
    </div>
    <div class="chart-container">
      <PieChart :totals="totals" :currentValues="currentValues" />
    </div>
    
    <div class="main-info">
      <h4 class="text-secondary">TOTAL EARNINGS</h4>
      <h2 :class="totalEarnings.s === -1 ? 'red' : 'green'">{{ totalEarnings.s === -1 ? "-" : "" }}${{ totalEarnings.abs().toFormat(2) }}</h2>
    </div>
  </section>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import PieChart from "D#/charts/PieChart.vue";
import { ref, toRefs, watch } from "vue";

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
const total = computed(() => Object.values(currentValues.value).reduce((prev, curr) => prev.plus(curr)));
const totalEarnings = computed(() => Object.values(earnings.value).reduce((prev, curr) => prev.plus(curr)));

const isHigher = ref(null);
watch(total, (newTotal, oldTotal) => {
  isHigher.value = newTotal.gte(oldTotal);
});
</script>

<style lang="sass" scoped>
  section
    width: 15vw
    height: 45vh
    padding: 2em
    background-color: $bg-dark
    border-radius: 1.5em
    margin-right: 2em

  .chart-container
    height: 30vh

  .main-info
    display: flex
    flex-direction: column
    align-items: center
</style>