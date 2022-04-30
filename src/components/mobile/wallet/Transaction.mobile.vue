<template>
  <tr :class="fontSize">
    <td v-if="withTicker" class="align-center">
      <img 
        :src="getIcon(crypto)" 
        :alt="crypto"
        onerror="this.onerror = null; this.src='/src/assets/icons/generic.svg'"
      >
      <span>{{ crypto }}/{{ base }}</span>
    </td>
    <td>{{ isBuy ? 'BUY' : 'SELL' }}</td>
    <td>{{ quantity }}</td>
    <td>{{ Big(price).toFormat(2) }}</td>
    <td v-if="!withTicker && $route.params.isAuth" class="right-align">
      <Button btnClass="bg-outline h4" btnCss="padding: 0.3em;" @click="displayPopup = true">Details</Button>
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
import TransactionPopup from "M#/wallet/TransactionPopup.mobile.vue";
import { ref, computed, watch } from "vue";
import { getDollarPrice } from "@/helpers/crypto.helper";
import Big from "@/helpers/big.helper";
import { useCryptoStore } from "S#/crypto.store";
import { getIcon } from "@/helpers/crypto.helper";;

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
let { isBuy, base, quantity, price } = transaction;

let value;
if (isBuy) 
  value = computed(() => Big(getDollarPrice(crypto, store.prices)).times(quantity));
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
    width: 36px
    height: 36px
    margin-right: .5em

  .right-align
    display: flex
    justify-content: flex-end
</style>