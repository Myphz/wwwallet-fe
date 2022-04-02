<template>
  <tr :class="fontSize">
    <td v-if="withTicker" class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span>BTC</span>
    </td>
    <td>BUY</td>
    <td>2.15</td>
    <td>$50982.34</td>
    <td v-if="!withTicker" class="right-align">
      <Button btnClass="bg-outline h4" btnCss="padding: 0.3em;" @click="openPopup">Details</Button>
    </td>
  </tr>
  <TransactionPopup v-if="displayPopup" :quantity="2342" @close="displayPopup = false" />
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import TransactionPopup from "@/components/mobile/TransactionPopup.mobile.vue";
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
  }
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

  td
    padding: 0.7em .5em

  img
    width: 36px
    height: 36px

  .right-align
    display: flex
    justify-content: flex-end

  .icon
    margin-right: .5em
</style>