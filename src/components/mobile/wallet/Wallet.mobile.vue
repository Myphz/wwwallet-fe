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
      <WalletRow v-for="crypto in cryptos" :crypto="crypto" />
    </tbody>
  </table>
</template>

<script setup>
import WalletRow from "M#/wallet/WalletRow.mobile.vue";
const cryptos = ["BTC", "ETH"]
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

</style>