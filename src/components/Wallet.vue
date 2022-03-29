<template>
  <table>
    <thead class="text-secondary">
      <tr>
        <th>Token</th>
        <th>Avg Price</th>
        <th>Quantity</th>
        <th>Value</th>
        <th>Total Revenue</th>
        <th>Total Change</th>
      </tr>
    </thead>
    <tbody>
      <WalletCrypto v-for="crypto in cryptos" :crypto="crypto" />
    </tbody>
  </table>
</template>

<script setup>
import WalletCrypto from "@/components/WalletCrypto.vue";
const cryptos = ["BTC", "ETH"]
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *

  table
    width: 100%
    // border-collapse: collapse
    
  th
    padding: 1em 1.5em
    text-align: left
    font-weight: bold

  img
    width: 48px
    height: 48px

</style>