<template>
  <span class="box align-center noselect">
    <Icon icon="logo" :class="small ? 'small' : ''" />
    <h2>wwwallet</h2>
  </span>
</template>

<script setup>
import Icon from "U#/Icon.vue";

defineProps({
  small: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="sass" scoped>
  .box
    font-family: $font-logo

  img
    margin-right: .5em

  .small
    width: 36px
    height: 36px

</style>