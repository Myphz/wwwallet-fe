<template>
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Avg Price</th>
        <th>Quantity</th>
        <th>Value</th>
        <th>Total Revenue</th>
        <th>Total Change</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <WalletRow v-for="crypto in cryptos" :crypto="crypto" />
    </tbody>
  </table>
</template>

<script setup>
import WalletRow from "D#/wallet/WalletRow.vue";
const cryptos = ["BTC", "ETH"]
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

</style>