<template>
  <section>
    <CryptoChart :crypto="crypto" :base="base" v-model:Base="base" v-model:Crypto="crypto" />
    <Suspense>
      <Transactions :crypto="crypto" />
      <template #fallback>
        Loading
      </template>
    </Suspense>
    <div class="justify-center" style="margin-bottom: 2em">
      <Button btnClass="h3 bg-dark bottom-rounded noborder" @click="authStore.redirect(); displayPopup = true">+ Add Transaction</Button>
    </div>
    <TransactionPopup 
      v-show="displayPopup" 
      @close="displayPopup = false"
      @request="value => request = value"
      :base="base" 
      :crypto="crypto" 
    />
  </section>
  <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" />
</template>

<script setup>
import CryptoChart from "D#/charts/CryptoChart.vue";
import Button from "U#/Button.vue";
import Transactions from "D#/wallet/Transactions.vue";
import TransactionPopup from "D#/wallet/TransactionPopup.vue";
import Popup from "U#/Popup.vue";

import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "S#/auth.store";

const authStore = useAuthStore();
const route = useRoute();

const crypto = ref(route.params.crypto.toUpperCase());
const base = ref("USDT");

const displayPopup = ref(false);
const request = ref({success: null, msg: ""});
</script>