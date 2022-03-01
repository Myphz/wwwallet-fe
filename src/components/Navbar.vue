<template>
  <nav>
    <Logo />
    <ul>
      <li>Home</li>
      <li>Market</li>
      <li>Dashboard</li>
    </ul>
    <Icon icon="user" />
  </nav>
</template>

<script setup>
import Logo from "@/components/Logo.vue"
import Icon from "@/components/Icon.vue"
</script>

<style lang="sass" scoped>
  $tab-font-size: 36px

  nav
    display: flex
    justify-content: space-between
    margin: 1em 0 3em 0
    font-size: $tab-font-size
    user-select: none

  ul
    list-style-type: none
    margin: 0
    padding: 0
  
  li
    display: inline-flex
    margin: 0 1em
</style>