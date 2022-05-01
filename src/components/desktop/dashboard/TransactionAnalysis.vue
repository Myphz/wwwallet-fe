<template>
  <tr>
    <td>{{ crypto }}/{{ transaction.base }}</td>
    <td>{{ transaction.isBuy ? 'BUY' : 'SELL' }}</td>
    <td>{{ Big(transaction.quantity).toFormat() }}</td>
    <td>{{ Big(transaction.price).toFormat() }}</td>
    <td :class="parseFloat(transaction.earnings) > 0 ? 'green' : parseFloat(transaction.earnings) < 0 ? 'red' : ''">{{ transaction.earnings.toFormat() }}</td>
    <td :class="parseFloat(transaction.change) > 0 ? 'green' : parseFloat(transaction.change) < 0 ? 'red' : ''">{{ formatPercentage(transaction.change) }}</td>
    <td>{{ formatDate(transaction.date) }}</td>
  </tr>
</template>

<script setup>
import Big from "@/helpers/big.helper.js";
import { formatPercentage, formatDate } from "@/helpers/formatter.helper.js";

defineProps({
  crypto: {
    type: String,
    required: true
  },

  currentValue: {
    type: Big,
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