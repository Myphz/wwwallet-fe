<template>
  <section>
    <CryptoChart crypto="BTC" base="USDT" />
    <Transactions crypto="BTC" />
    <div class="justify-center bottom">
      <Button btnClass="h4 bg-dark bottom-rounded noborder" @click="openPopup">+ Add Transaction</Button>
    </div>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false" />
  </section>
</template>

<script setup>
import CryptoChart from "M#/charts/CryptoChart.mobile.vue";
import Transactions from "M#/wallet/Transactions.mobile.vue";
import TransactionPopup from "M#/wallet/TransactionPopup.mobile.vue";
import Button from "U#/Button.vue";
import { ref } from "vue";

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>