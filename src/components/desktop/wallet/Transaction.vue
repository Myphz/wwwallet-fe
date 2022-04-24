<template>
  <tr :class="'transition nohover ' + fontSize + ' ' + (shorter ? 'short' : '')">
    <td v-if="withTicker" class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>{{ crypto }}/{{ base }}</td>
    <td>{{ isBuy ? 'BUY' : 'SELL' }}</td>
    <td>{{ quantity }}</td>
    <td>${{ price }}</td>
    <td>$80982.34</td>
    <td>20/12/2021 15:03</td>
    <td>
      <Button btnClass="bg-outline h4" @click="openPopup">Details</Button>
    </td>
  </tr>
  <TransactionPopup v-if="displayPopup" :quantity="2342" @close="displayPopup = false" />
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Button from "U#/Button.vue";
import TransactionPopup from "D#/wallet/TransactionPopup.vue";
import { ref } from "vue";
import { dateFormat } from "@/helpers/formatDate.helper";
import Big from "big.js";

const { transaction } = defineProps({
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

let { isBuy, base, quantity, price, date } = transaction;
date = dateFormat(date);
const value = Big(quantity).times(price).toFixed(2);

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px

  .icon
    margin-right: 1em

  .icon-small
    width: 36px
    height: 36px

  .short
    td
      padding: 0.3em 1em

</style>