<template>
  <nav>
    <Logo />
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/crypto">Market</RouterLink></li>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
    </ul>
    <Icon icon="user" />
  </nav>
</template>

<script setup>
import Logo from "@/components/Logo.vue"
import Icon from "@/components/Icon.vue"
import { RouterLink } from "vue-router";
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
  
  a
    text-decoration: none
    color: inherit

</style>