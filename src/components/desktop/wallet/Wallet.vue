<template>
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Avg Buy Price</th>
        <th>Avg Sell Price</th>
        <th>Quantity</th>
        <th>Value</th>
        <th>Total Earnings</th>
        <th>Total Change</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <WalletRow v-for="crypto in cryptos" :key="crypto" :crypto="crypto" @request="value => request = value" />
    </tbody>
  </table>
  <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" />
</template>

<script setup>
import WalletRow from "D#/wallet/WalletRow.vue";
import Popup from "U#/Popup.vue";
import { useAuthStore } from "S#/auth.store";
import { computed, ref } from "vue";

const authStore = useAuthStore();

const isLogged = ref(await authStore.getTransactions());
const cryptos = computed(() => Object.keys(authStore.transactions));

const request = ref({success: null});
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

</style>