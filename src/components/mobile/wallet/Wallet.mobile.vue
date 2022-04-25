<template>
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Value</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-if="$route.params.isAuth">
      <WalletRow v-for="crypto in cryptos" :key="crypto" :crypto="crypto" @request="value => request = value" />
    </tbody>
    <tbody v-else>
      <WalletRow 
        v-for="crypto in Object.keys(cryptoStore.tickerInfo).filter(key => !QUOTES_DOLLAR.includes(key)).sort(byMcap(cryptoStore)).slice(0, 5)" 
        :key="crypto" 
        :crypto="crypto"
      />
    </tbody>
  </table>
  <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" mobile />
</template>

<script setup>
import WalletRow from "M#/wallet/WalletRow.mobile.vue";
import Popup from "U#/Popup.vue";
import byMcap from "@/helpers/sortByMcap.helper.js";
import { QUOTES_DOLLAR } from "@/config/config.js";
import { useAuthStore } from "S#/auth.store.js";
import { useCryptoStore } from "S#/crypto.store.js";
import { computed, ref } from "vue";

const authStore = useAuthStore();
await authStore.getTransactions();

const cryptoStore = useCryptoStore();

const cryptos = computed(() => Object.keys(authStore.transactions));

const request = ref({success: null, msg: ""});
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

</style>