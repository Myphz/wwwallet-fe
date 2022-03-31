<template>
  <table :class="'nohover ' + bgColor">
    <thead>
      <tr>
        <th v-if="withTicker">Token</th>
        <th>Side</th>
        <th>Quantity</th>
        <th>Price</th>
        <th v-if="!withTicker"></th>
      </tr>
    </thead>
    <tbody>
      <Transaction v-for="i in 2" :key="i" :crypto="crypto" :withTicker="withTicker" :fontSize="fontSize" />
    </tbody>
  </table>
</template>

<script setup>
import Transaction from "@/components/mobile/Transaction.mobile.vue";

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
  }
});
</script>

<style lang="sass" scoped>
  table
    border-radius: 1.5em

  th
    padding: 1em .5em
    text-align: left
    font-weight: bold

</style>