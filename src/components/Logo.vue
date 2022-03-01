<template>
  <span class="box">
    <Icon icon="logo" />
    <span>wwwallet</span>
  </span>
</template>

<script setup>
import Icon from "@/components/Icon.vue"
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rambla:ital,wght@1,700&display=swap')

  $logo-font-size: 44px
  $logo-margin: 10px

  .box
    display: flex
    align-items: center
    font-family: 'Rambla', sans-serif
    font-size: $logo-font-size

  img
    margin-right: $logo-margin
</style>