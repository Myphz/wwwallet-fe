<template>
  <span class="box">
    <Icon icon="logo" />
    <span class="h1">wwwallet</span>
  </span>
</template>

<script setup>
import Icon from "@/components/Icon.vue"
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rambla:ital,wght@1,700&display=swap')
  @import "/src/assets/sass/_utilities.sass"

  .box
    display: flex
    align-items: center
    font-family: 'Rambla', sans-serif
    user-select: none

  img
    margin-right: 10px
</style>