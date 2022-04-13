<template>
  <tr :class="'h4 transition main-row'" @click="open = !open">
    <td class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="ticker">BTC</span>
    </td>
    <td>$31982.23</td>
    <td>2.15</td>
    <td :class="'arrow ' + (open ? 'open' : '')"></td>
  </tr>
  <tr :class="'transactions-row ' + (open ? 'row-open' : '')">
    <td colspan="4">
      <Transactions :crypto="crypto" :withTicker="false" bgColor="bg-base-dark" fontSize="h5" />
    </td>
  </tr>
</template>
<script setup>
import Icon from "U#/Icon.vue";
import Transactions from "M#/wallet/Transactions.mobile.vue";

import { ref } from "vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true,
  },
});

const open = ref(false);
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

  .icon
    margin-right: 1em

  .transactions-row
    background-color: darken($bg-base, 2%)
    display: none

  .row-open
    display: table-row
</style>