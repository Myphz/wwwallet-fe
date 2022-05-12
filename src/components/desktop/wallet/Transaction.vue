<template>
  <tr :class="'transition nohover ' + fontSize + ' ' + (shorter ? 'short' : '')">
    <td v-if="withTicker" class="align-center">
      <img 
        :src="getIcon(crypto)" 
        :alt="crypto"
        onerror="this.src='/icons/generic.svg'"
      >
      <span class="title">{{ store.tickerInfo[crypto]?.name || crypto }}</span>
      <span class="ticker">{{ crypto }}</span>
    </td>
    <td>{{ crypto }}/{{ base }}</td>
    <td>{{ isBuy ? 'BUY' : 'SELL' }}</td>
    <td>{{ quantity }}</td>
    <td>{{ Big(price).toFormat() }}</td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">{{ value && formatValue(value) || "" }}</td>
    <td>{{ formatDate(date) }}</td>
    <td v-if="!withTicker && $route.params.isAuth">
      <Button btnClass="bg-outline h4" @click="displayPopup = true">Details</Button>
    </td>
  </tr>
  <TransactionPopup 
    v-if="displayPopup" 
    :crypto="crypto" 
    :transaction="transaction" 
    @request="value => $parent.$emit('request', value)"
    @close="displayPopup = false" 
  />
</template>

<script setup>
import Button from "U#/Button.vue";
import TransactionPopup from "D#/wallet/TransactionPopup.vue";
import { ref, computed, watch } from "vue";

import { formatDate, formatValue } from "@/helpers/formatter.helper";
import { getFavPrice, getIcon } from "@/helpers/crypto.helper";
import Big from "@/helpers/big.helper";
import { useCryptoStore } from "S#/crypto.store";

const { transaction , crypto } = defineProps({
  transaction: {
    type: Object,
    required: true
  },

  crypto: {
    type: String,
    required: true
  },

  fontSize: {
    type: String,
    default: "h4"
  },

  withTicker: {
    type: Boolean,
    default: true
  },

  shorter: {
    type: Boolean,
    default: false
  },
});

const store = useCryptoStore();
let { isBuy, base, quantity, price, date } = transaction;

let value;
if (isBuy) 
  value = computed(() => Big(getFavPrice(crypto, store.prices)).times(quantity));
else
  value = Big(price).times(quantity);

const displayPopup = ref(false);

const isHigher = ref(null);
if (isBuy) {
  watch(value, (newValue, oldValue) => {
    isHigher.value = newValue.gt(oldValue);
  });
};
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px
    margin-right: 1em
    
  .icon-small
    width: 36px
    height: 36px

  .short
    td
      padding: 0.3em 1em

</style>