<template>
  <tr :class="'h4 transition main-row'" @click="open = !open">
    <td class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>$19923.32</td>
    <td>2.15</td>
    <td>$31982.23</td>
    <td>$80982.34</td>
    <td>+20.32%</td>
    <td :class="'arrow ' + (open ? 'open' : '')"></td>
  </tr>
  <tr :class="'transactions-row ' + (open ? 'row-open' : '')">
    <td colspan="7">
      <Transactions :crypto="crypto" :withTicker="false" bgColor="bg-base-dark" fontSize="h5" shorter />
    </td>
  </tr>
</template>
<script setup>
import Icon from "U#/Icon.vue";
import Transactions from "D#/wallet/Transactions.vue";
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
  $anim-duration: 0.25s

  .main-row
    border-bottom: 1px solid $primary
    cursor: pointer
    &:hover
      background-color: lighten($bg-base, 10%)
    
  img
    width: 48px
    height: 48px

  .title
    font-weight: 600
    margin-right: 1em

  .icon
    margin-right: 1em

  .arrow
    width: 16px
    height: 16px
    position: relative
    transition: $anim-duration ease

    &:before, &:after
      position: absolute
      content: ''
      width: 3px
      height: 10px
      border-bottom: 12px solid $text-primary
      background-color: transparent
      transition: $anim-duration ease

    &:before
      transform: rotate(-135deg)
    &:after
      transform: rotate(135deg)

  .open 
    transform: rotate(0)
    transform: translate(0, -6px)
    &:before
      transform: rotate(-45deg)
    &:after
      transform: rotate(45deg)

  .transactions-row
    background-color: darken($bg-base, 2%)
    transform-origin: top
    transition: $anim-duration all ease
    display: none

  .row-open
    display: table-row
</style>