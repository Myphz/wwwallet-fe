<template>
  <section>
    <Chart crypto="BTC" base="USDT" />
    <Transactions crypto="BTC" />
    <div class="justify-center" style="margin-bottom: 2em">
      <Button btnClass="h3 bg-dark bottom-rounded noborder" @click="openPopup">+ Add Transaction</Button>
    </div>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false" />
  </section>
</template>

<script setup>
import Chart from "@/components/Chart.vue";
import Button from "@/components/Button.vue";
import Transactions from "@/components/Transactions.vue";
import TransactionPopup from "@/components/TransactionPopup.vue";
import { ref } from "vue";

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>