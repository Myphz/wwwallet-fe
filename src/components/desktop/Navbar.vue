<template>
  <nav class="noselect">
    <Logo />
    <ul class="h2">
      <li><RouterLink to="/crypto">Markets</RouterLink></li>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li><RouterLink to="/wallet">Wallet</RouterLink></li>
    </ul>
    <RouterLink :to="$route.params.isAuth ? '/settings' : '/login'" class="align-center"><UserIcon class="user-icon" /></RouterLink>
  </nav>
</template>

<script setup>
import Logo from "U#/Logo.vue"
import { RouterLink } from "vue-router";
import { defineAsyncComponent } from "vue";
const UserIcon = defineAsyncComponent(() => import("../../assets/icons/user.svg"));
</script>

<style lang="sass" scoped>
  nav
    display: flex
    justify-content: space-between
    margin: 2em 0 3em 0

  ul
    list-style-type: none
    margin: 0
    padding: 0

  a
    transition: 0.25s all
  
  li
    display: inline-flex
    margin: 0 1em
    transition: 0.25s all
    &:hover
      a
        color: darken($text-primary, 10%)

  .user-icon
    transform: scale(1.5)
</style>