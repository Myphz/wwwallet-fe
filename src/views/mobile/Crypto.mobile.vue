<template>
  <section>
    <Chart crypto="BTC" base="USDT" :navOpen="navOpen">
      <Transactions crypto="BTC" @open="openPopup" />
    </Chart>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false"/>
    <h1> {{ navOpen }}</h1>
  </section>
</template>

<script setup>
import Chart from "@/components/mobile/Chart.mobile.vue";
import Transactions from "@/components/mobile/Transactions.mobile.vue";
import TransactionPopup from "@/components/mobile/TransactionPopup.mobile.vue";
import { ref, toRefs } from "vue";

const displayPopup = ref(false);
const props = defineProps({
  navOpen: {
    type: Boolean,
    required: true
  }
});

const { navOpen } = toRefs(props);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>