<template>
  <section>
    <CryptoChart :crypto="crypto" :base="base" v-model:Base="base" v-model:Crypto="crypto" />
    <Suspense>
      <Transactions :crypto="crypto" />
      <template #fallback>
        Loading
      </template>
    </Suspense>
    <div class="justify-center bottom">
      <Button btnClass="h4 bg-dark bottom-rounded noborder" @click="authStore.openPopup(); displayPopup = true">+ Add Transaction</Button>
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
  <Popup :success="success" :message="message" @endAnimation="success = null" mobile />

</template>

<script setup>
import CryptoChart from "M#/charts/CryptoChart.mobile.vue";
import Transactions from "M#/wallet/Transactions.mobile.vue";
import TransactionPopup from "M#/wallet/TransactionPopup.mobile.vue";
import Popup from "U#/Popup.vue";
import Button from "U#/Button.vue";

import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "S#/auth.store";

const authStore = useAuthStore();
const route = useRoute();

const crypto = ref(route.params.crypto.toUpperCase());
const base = ref("USDT");

const displayPopup = ref(false);
const success = ref(null);
const message = ref("");
</script>