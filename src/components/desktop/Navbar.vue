<template>
  <nav class="noselect">
    <Logo />
    <ul class="h2">
      <li :class="path == '/crypto' ? 'current-tab' : ''"><RouterLink to="/crypto">Markets</RouterLink></li>
      <li :class="path == '/dashboard' ? 'current-tab' : ''"><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li :class="path == '/wallet' ? 'current-tab' : ''"><RouterLink to="/wallet">Wallet</RouterLink></li>
    </ul>
    <RouterLink to="/login" class="align-center"><UserIcon class="user-icon" /></RouterLink>
  </nav>
</template>

<script setup>
import Logo from "U#/Logo.vue"
import { RouterLink, useRoute } from "vue-router";
import { computed, defineAsyncComponent } from "vue";

const UserIcon = defineAsyncComponent(() => import("../../assets/icons/user.svg"));
const route = useRoute();
const path = computed( () => route.path );
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
    transition: 0.25s all
    &:hover
      box-shadow: inset 0 -1px 0 0 $text-primary

  .current-tab
    box-shadow: inset 0 -1px 0 0 $text-primary

  .user-icon
    transform: scale(1.5)

</style>