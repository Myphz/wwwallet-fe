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
    <tbody>
      <WalletRow v-for="crypto in cryptos" :key="crypto" :crypto="crypto" @request="value => request = value" />
    </tbody>
  </table>
  <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" mobile />
</template>

<script setup>
import WalletRow from "M#/wallet/WalletRow.mobile.vue";
import Popup from "U#/Popup.vue";
import { useAuthStore } from "S#/auth.store";
import { computed, ref } from "vue";

const authStore = useAuthStore();

const isLogged = ref(await authStore.getTransactions());
const cryptos = computed(() => Object.keys(authStore.transactions));

const request = ref({success: null, msg: ""});
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

</style>