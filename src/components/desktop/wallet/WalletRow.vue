<template>
  <tr :class="'h4 transition main-row'" @click="open = !open">
    <td class="align-center">
      <img
        :src="getIcon(crypto)"
        :alt="crypto"
        onerror="this.src='/icons/generic.svg'"
      />
      <span class="title">
        {{ cryptoStore.tickerInfo[crypto]?.name || crypto }}
      </span>
      <span class="ticker">{{ crypto }}</span>
    </td>
    <td>
      {{
        formatValue(
          totals.avgBuyPrice,
          getDecimalDigits(transactions[0]?.price)
        )
      }}
    </td>
    <td>
      {{
        !totals.avgSellPrice.eq(0)
          ? formatValue(
              totals.avgSellPrice,
              getDecimalDigits(transactions[0]?.price)
            )
          : "N/A"
      }}
    </td>
    <td>{{ totals.totalQuantity.toFormat() }}</td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
      {{ formatValue(currentValue) }}
    </td>
    <td
      :class="
        totalEarnings.s === -1 ? 'red' : totalEarnings.eq(0) ? '' : 'green'
      "
    >
      {{ formatValue(totalEarnings) }}
    </td>
    <td :class="pctChange.s === -1 ? 'red' : pctChange.eq(0) ? '' : 'green'">
      {{ formatPercentage(pctChange) }}
    </td>
    <td :class="'arrow ' + (open ? 'open' : '')"></td>
  </tr>
  <tr v-show="open" class="transactions-row">
    <td colspan="8">
      <Transactions
        :crypto="crypto"
        :withTicker="false"
        :transactions="$route.params.isAuth ? [] : computedTransactions"
        bgColor="bg-base-dark"
        fontSize="h5"
        shorter
        @request="(value) => $emit('request', value)"
      />
    </td>
  </tr>
</template>

<script setup>
import Transactions from "D#/wallet/Transactions.vue";
import { ref, watch, computed, toRefs } from "vue";

import Big from "@/helpers/big.helper.js";
import { addEarnings } from "@/helpers/transactions.helper.js";
import { useCryptoStore } from "S#/crypto.store";
import { getFavPrice, getIcon } from "@/helpers/crypto.helper";
import {
  getDecimalDigits,
  formatPercentage,
  formatValue,
} from "@/helpers/formatter.helper";

const props = defineProps({
  crypto: {
    type: String,
    required: true,
  },

  transactions: {
    type: Object,
    required: true,
  },

  totals: {
    type: Object,
    required: true,
  },

  currentValue: {
    type: Big,
    required: true,
  },
});

const { crypto } = props;
const { transactions, totals, currentValue } = toRefs(props);

defineEmits(["request"]);

const cryptoStore = useCryptoStore();
const open = ref(false);

const computedTransactions = computed(() =>
  addEarnings(transactions.value, crypto, cryptoStore.prices)
);

const totalEarnings = computed(() => {
  let ret = Big(0);
  for (const { earnings } of computedTransactions.value) {
    ret = ret.plus(earnings);
  }
  return ret;
});

const pctChange = computed(() => {
  // Weighted average
  let ret = Big(0);
  let totVal = Big(0);
  for (const transaction of computedTransactions.value) {
    if (transaction.earnings.eq(0)) continue;
    const val = Big(transaction.quantity).times(
      getFavPrice(transaction.base, cryptoStore.prices)
    );
    totVal = totVal.plus(val);
    ret = ret.plus(transaction.change.times(val));
  }
  return totVal.eq(0) ? Big(0) : ret.div(totVal);
});

const isHigher = ref(null);
watch(currentValue, (newValue, oldValue) => {
  isHigher.value = newValue > oldValue;
});
</script>

<style lang="sass" scoped>
.main-row
  border-bottom: 1px solid $primary
  cursor: pointer
  &:hover
    background-color: lighten($bg-base, 10%)

img
  width: 48px
  height: 48px
  margin-right: 1em
  border-radius: 999rem
  background: white

.transactions-row
  background-color: darken($bg-base, 2%)
</style>
