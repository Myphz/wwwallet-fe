<template>
  <table :class="'nohover ' + bgColor + ' ' + (shorter ? 'short ' : '')">
    <thead>
      <tr>
        <th v-if="withTicker">Token</th>
        <th>Pair</th>
        <th>Side</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Value</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <Transaction v-for="i in 2" :key="i" :crypto="crypto" :withTicker="withTicker" :shorter="shorter" :fontSize="fontSize" />
    </tbody>
  </table>
</template>

<script setup>
import Transaction from "D#/wallet/Transaction.vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  fontSize: {
    type: String,
    default: "h4"
  },

  bgColor: {
    type: String,
    default: "bg-dark"
  },

  withTicker: {
    type: Boolean,
    default: true
  },

  shorter: {
    type: Boolean,
    default: false
  }
  
});
</script>

<style lang="sass" scoped>
  table
    border-radius: 1.5em

  .short
    th
      padding: .5em 1em

</style>