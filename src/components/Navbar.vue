<template>
  <nav class="noselect">
    <Logo />
    <ul class="h2">
      <li><RouterLink to="/wallet">Wallet</RouterLink></li>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li><RouterLink to="/crypto">Markets</RouterLink></li>
    </ul>
    <RouterLink to="/login"><Icon icon="user" /></RouterLink>
  </nav>
</template>

<script setup>
import Logo from "@/components/Logo.vue"
import Icon from "@/components/Icon.vue"
import { RouterLink } from "vue-router";
</script>

<style lang="sass" scoped>
  nav
    display: flex
    justify-content: space-between
    margin: 1em 0 3em 0

  ul
    list-style-type: none
    margin: 0
    padding: 0
  
  li
    display: inline-flex
    margin: 0 1em

</style>