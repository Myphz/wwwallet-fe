<template>
  <tr>
    <td>{{ crypto }}/{{ transaction.base }}</td>
    <td>{{ transaction.isBuy ? 'BUY' : 'SELL' }}</td>
    <td>{{ Big(transaction.quantity).toFormat() }}</td>
    <td>{{ formatValue(transaction.price) }}</td>
    <td :class="parseFloat(transaction.earnings) > 0 ? 'green' : parseFloat(transaction.earnings) < 0 ? 'red' : ''">{{ formatValue(transaction.earnings) }}</td>
    <td :class="parseFloat(transaction.change) > 0 ? 'green' : parseFloat(transaction.change) < 0 ? 'red' : ''">{{ formatPercentage(transaction.change) }}</td>
    <td>{{ dateFormat(transaction.date) }}</td>
  </tr>
</template>

<script setup>
import Big from "@/helpers/big.helper.js";
import { formatValue, formatPercentage } from "@/helpers/formatNumber.helper.js";
import { dateFormat } from "@/helpers/formatDate.helper.js";

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