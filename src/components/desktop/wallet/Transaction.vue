<template>
  <tr :class="'transition nohover ' + fontSize + ' ' + (shorter ? 'short' : '')">
    <td v-if="withTicker" class="align-center">
      <img 
        :src="getCryptoIcon(crypto)" 
        :alt="crypto"
        onerror="this.onerror = null; this.src='/src/assets/icons/generic.svg'"
      >
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>{{ crypto }}/{{ base }}</td>
    <td>{{ isBuy ? 'BUY' : 'SELL' }}</td>
    <td>{{ quantity }}</td>
    <td>{{ price }}</td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">${{ value && value.toFormat(2) || "" }}</td>
    <td>{{ date }}</td>
    <td>
      <Button btnClass="bg-outline h4" @click="openPopup">Details</Button>
    </td>
  </tr>
  <TransactionPopup v-if="displayPopup" :quantity="2342" @close="displayPopup = false" />
</template>

<script setup>
import Button from "U#/Button.vue";
import TransactionPopup from "D#/wallet/TransactionPopup.vue";
import { ref, computed, watch } from "vue";
import { dateFormat } from "@/helpers/formatDate.helper";
import { getDollarPrice } from "@/helpers/getPrice.helper";
import Big from "@/helpers/big.helper";
import { useCryptoStore } from "S#/crypto.store";
import getCryptoIcon from "@/helpers/getCryptoIcon.helper";

const { transaction , crypto} = defineProps({
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
date = dateFormat(date);
const value = computed(() => Big(getDollarPrice(crypto, store.prices)).times(quantity));

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
};

const isHigher = ref(null);
watch(value, (newValue, oldValue) => {
  isHigher.value = newValue.gt(oldValue);
});
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