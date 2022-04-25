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
      <WalletRow v-for="crypto in cryptos" :key="crypto" :crypto="crypto" />
    </tbody>
  </table>
</template>

<script setup>
import WalletRow from "M#/wallet/WalletRow.mobile.vue";
import { useAuthStore } from "S#/auth.store";
import { computed, ref } from "vue";

const authStore = useAuthStore();

const isLogged = ref(await authStore.getTransactions());
const cryptos = computed(() => Object.keys(authStore.transactions));
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

</style>