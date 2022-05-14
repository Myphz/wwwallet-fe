<template>
  <section class="shadow">
    <div class="main-info">
      <h4 class="text-secondary">TOTAL ASSET VALUE</h4>
      <h2 :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">{{ formatValue(total) }}</h2>
    </div>
    <div v-if="height" :style="`height: ${height}px`">
      <PieChart :totals="totals" :currentValues="currentValues" />
    </div>
    
    <div class="main-info">
      <h4 class="text-secondary">TOTAL EARNINGS</h4>
      <h2 :class="totalEarnings.s === -1 ? 'red' : 'green'">{{ formatValue(totalEarnings) }}</h2>
    </div>
  </section>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import PieChart from "D#/charts/PieChart.vue";
import { onMounted, ref, toRefs, watch } from "vue";
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

// Set pie chart height to fill the remaining height
const height = ref();
onMounted(() => {
  const elements = document.getElementsByClassName("main-info");
  let ret = 0;
  for (const element of elements) {
    ret += element.offsetHeight;
  };

  height.value = document.documentElement.clientHeight * 0.6 - ret;
});

const isHigher = ref(null);
watch(total, (newTotal, oldTotal) => {
  isHigher.value = newTotal.gte(oldTotal);
});
</script>

<style lang="sass" scoped>
  section
    width: 15vw
    background-color: $bg-dark
    border-radius: 1.5em
    margin-right: 2em

  .main-info
    display: flex
    flex-direction: column
    align-items: center
    &:first-of-type
      padding-top: 2em
    &:last-of-type
      padding-bottom: 2em
    h2
      font-weight: 550
</style>