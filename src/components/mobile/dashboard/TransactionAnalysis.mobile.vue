<template>
  <div class="trans h5">
    <div class="h3 margin-bottom">
      Transaction #{{n}}
    </div>

    <div class="space-between header">
      <span>Pair</span>
      <span>Side</span>
    </div>
    <div class="space-between margin-bottom">
      <span>{{ crypto }}/{{ transaction.base }}</span>
      <span>{{ transaction.isBuy ? 'BUY' : 'SELL' }}</span>
    </div>

    <div class="space-between header">
      <span>Quantity</span>
      <span>Price</span>
    </div>
    <div class="space-between margin-bottom">
      <span>{{ Big(transaction.quantity).toFormat() }}</span>
      <span>{{ Big(transaction.price).toFormat() }}</span>
    </div>

    <div class="space-between header">
      <span>Earnings</span>
      <span>% Change</span>
    </div>
    <div class="space-between margin-bottom">
      <span :class="parseFloat(transaction.earnings) > 0 ? 'green' : parseFloat(transaction.earnings) < 0 ? 'red' : ''">{{ transaction.earnings.toFormat() }}</span>
      <span :class="parseFloat(transaction.earnings) > 0 ? 'green' : parseFloat(transaction.earnings) < 0 ? 'red' : ''">{{ formatPercentage(transaction.change) }}</span>
    </div>
  </div>
</template>

<script setup>
import Big from "@/helpers/big.helper.js";
import { formatPercentage } from "@/helpers/formatter.helper.js";

defineProps({
  crypto: {
    type: String,
    required: true
  },

  currentValue: {
    type: Big,
    required: true
  },

  n: {
    type: Number,
    required: true
  },

  transaction: {
    type: Object,
    required: true
  },

  transactions: {
    type: Array,
    required: true
  }
});
</script>

<style lang="sass" scoped>
  .trans
    background-color: lighten($bg-dark, 2%)
    margin-bottom: 1em
    border-radius: 1em
    padding: 1em

  .header
    font-weight: bold
    color: $text-secondary 

  .margin-bottom
    margin-bottom: .5em
</style>