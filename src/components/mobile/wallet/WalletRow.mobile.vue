<template>
  <tr :class="'h4 transition main-row'" @click="open = !open">
    <td class="align-center">
      <img
        :src="getIcon(crypto)"
        :alt="crypto"
        onerror="this.src='/icons/generic.svg'"
      />
      <span class="ticker">{{ crypto }}</span>
    </td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
      {{ formatValue(currentValue) }}
    </td>
    <td>{{ totals.totalQuantity.toFormat() }}</td>
    <td :class="'arrow ' + (open ? 'open' : '')"></td>
  </tr>
  <tr v-show="open" class="transactions-row">
    <td colspan="4">
      <Transactions
        :crypto="crypto"
        :withTicker="false"
        :transactions="$route.params.isAuth ? [] : transactions"
        bgColor="bg-base-dark"
        fontSize="h5"
        @request="(value) => $emit('request', value)"
      />
    </td>
  </tr>
</template>

<script setup>
import Transactions from "M#/wallet/Transactions.mobile.vue";
import { ref, watch, toRefs } from "vue";

import Big from "@/helpers/big.helper.js";
import { getIcon } from "@/helpers/crypto.helper";
import { formatValue } from "@/helpers/formatter.helper";

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

const { currentValue } = toRefs(props);

defineEmits(["request"]);

const open = ref(false);
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
  width: 36px
  height: 36px
  margin-right: 1em
  border-radius: 999rem
  background: white

.transactions-row
  background-color: darken($bg-base, 2%)
</style>
