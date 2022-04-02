<template>
  <tr :class="'transition nohover ' + fontSize + ' ' + (shorter ? 'short' : '')">
    <td v-if="withTicker" class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>BTC/USDT</td>
    <td>BUY</td>
    <td>2.15</td>
    <td>$31982.23</td>
    <td>$80982.34</td>
    <td class="space-between align-center">
      <span>20/12/2021 15:03</span>
      <Button btnClass="bg-outline h4" @click="openPopup">Details</Button>
    </td>
  </tr>
  <TransactionPopup v-if="displayPopup" :quantity="2342" @close="displayPopup = false" />
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import TransactionPopup from "@/components/TransactionPopup.vue";
import { ref } from "vue";

const { crypto } = defineProps({
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

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>

<style lang="sass" scoped>
  .title
    font-weight: 600
    margin-right: 1em

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