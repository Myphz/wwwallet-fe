<template>
  <tr :class="'h4 transition ' + bgColor + ' ' + (shorter ? 'short' : '')">
    <td v-if="withTicker" class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>BUY</td>
    <td>2.15</td>
    <td>$31982.23</td>
    <td>$80982.34</td>
    <td>20/12/2021 15:03</td>
  </tr>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  bgColor: {
    type: String,
    default: "bg-dark"
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
</script>

<style lang="sass" scoped>
  tr
    cursor: pointer
  
  .bg-dark
    background-color: $bg-dark
    &:hover
      background-color: lighten($bg-dark, 10%)

  .bg-paper
    background-color: $bg-paper
    &:hover
      background-color: darken($bg-paper, 10%)

  .bg-base
    background-color: $bg-base
    &:hover
      background-color: lighten($bg-base, 10%)

  .title
    font-weight: 600
    margin-right: 1em

  img
    width: 48px
    height: 48px

  .icon
    margin-right: 1em

  .short
    td
      padding: 0.3em 1em
</style>