<template>
  <section>
    <CryptoChart :crypto="crypto" :base="base" v-model:Base="base" v-model:Crypto="crypto" />
    <Transactions :crypto="crypto" />
    <div class="justify-center" style="margin-bottom: 2em">
      <Button btnClass="h3 bg-dark bottom-rounded noborder" @click="openPopup">+ Add Transaction</Button>
    </div>
    <TransactionPopup 
      v-show="displayPopup" 
      @close="displayPopup = false"
      @success="value => success = value"
      @message="value => message = value"
      :base="base" 
      :crypto="crypto" 
    />
  </section>
  <Popup :success="success" :message="message" @endAnimation="success = null" />
</template>

<script setup>
import CryptoChart from "D#/charts/CryptoChart.vue";
import Button from "U#/Button.vue";
import Transactions from "D#/wallet/Transactions.vue";
import TransactionPopup from "D#/wallet/TransactionPopup.vue";
import Popup from "U#/Popup.vue";

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "S#/auth.store";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const crypto = ref(route.params.crypto.toUpperCase());
const base = ref("USDT");

const displayPopup = ref(false);
const success = ref(null);
const message = ref("");

const openPopup = async () => {
  const isAuth = await authStore.checkAuth();
  if (!isAuth) return router.push({ name: "login", params: { redirect: route.path } });

  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>