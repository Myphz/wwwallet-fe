<template>
  <span class="box align-center noselect">
    <Icon icon="logo" />
    <span class="h1">wwwallet</span>
  </span>
</template>

<script setup>
import Icon from "@/components/Icon.vue"
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *
  @import url('https://fonts.googleapis.com/css2?family=Rambla:ital,wght@1,700&display=swap')

  .box
    font-family: 'Rambla', sans-serif

  img
    margin-right: 10px
</style>