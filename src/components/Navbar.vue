<template>
  <nav class="noselect">
    <Logo />
    <ul class="h2">
      <li><RouterLink to="/crypto">Markets</RouterLink></li>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li><RouterLink to="/wallet">Wallet</RouterLink></li>
    </ul>
    <RouterLink to="/login" class="align-center"><UserIcon class="user-icon" /></RouterLink>
  </nav>
</template>

<script setup>
import Logo from "@/components/Logo.vue"
import { RouterLink } from "vue-router";
import { defineAsyncComponent } from "vue";

const UserIcon = defineAsyncComponent(() => import("../assets/icons/user.svg"));
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
  
  li
    display: inline-flex
    margin: 0 1em

  .user-icon
    transform: scale(1.5)

</style>