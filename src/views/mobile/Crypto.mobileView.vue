<template>
  <section>
    <CryptoChart :crypto="crypto" :base="base" v-model="base" />
    <Transactions :crypto="crypto" />
    <div class="justify-center bottom">
      <Button btnClass="h4 bg-dark bottom-rounded noborder" @click="openPopup">+ Add Transaction</Button>
    </div>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false" :base="base" />
  </section>
</template>

<script setup>
import CryptoChart from "M#/charts/CryptoChart.mobile.vue";
import Transactions from "M#/wallet/Transactions.mobile.vue";
import TransactionPopup from "M#/wallet/TransactionPopup.mobile.vue";
import Button from "U#/Button.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const crypto = route.params.crypto.toUpperCase();
const base = ref("USDT");

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>