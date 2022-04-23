<template>
  <section>
    <CryptoChart :crypto="crypto" :base="base" v-model:Base="base" v-model:Crypto="crypto" />
    <Transactions :crypto="crypto" />
    <div class="justify-center" style="margin-bottom: 2em">
      <Button btnClass="h3 bg-dark bottom-rounded noborder" @click="openPopup">+ Add Transaction</Button>
    </div>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false" :base="base" :crypto="crypto" />
  </section>
</template>

<script setup>
import CryptoChart from "D#/charts/CryptoChart.vue";
import Button from "U#/Button.vue";
import Transactions from "D#/wallet/Transactions.vue";
import TransactionPopup from "D#/wallet/TransactionPopup.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const crypto = ref(route.params.crypto.toUpperCase());
const base = ref("USDT");

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>