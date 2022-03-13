<template>
  <nav class="bg-dark">
    <div class="noselect stay align-center sidenav">
      <Logo />
      <MenuIcon @click="openNavbar = !openNavbar" />
    </div>
    
    <div class="rel">
      <aside :class="'h1 bg-dark ' + (openNavbar ? 'open' : 'closed')">
        <ul @click="openNavbar = !openNavbar" >
          <li>
            <RouterLink to="/">
              <Icon icon="home" />Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/dashboard">
              <Icon icon="dashboard" />Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/crypto">
              <Icon icon="chart" />Markets
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/login">
              <Icon icon="user" />Login
            </RouterLink>
          </li>
        </ul>

      </aside>
    </div>
  </nav>
</template>

<script setup>
import Logo from "@/components/Logo.vue";
import { defineAsyncComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import Icon from "@/components/Icon.vue";
const MenuIcon = defineAsyncComponent(() => import("../../assets/icons/menu.svg"));
const openNavbar = ref(false);
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *
  @use "/src/assets/sass/_variables.sass" as *

  nav
    position: sticky
    top: 0

  .sidenav
    justify-content: space-between
    padding: 1em 5vw

  .bg-dark
    background-color: $bg-dark

  aside
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100vh
    transform-origin: top
    transition: 0.25s transform ease-out

  ul
    margin: 0 5vw

  li
    margin: .5em 0

  a
    display: flex
    align-items: center

  img
    margin-right: 1em

  .closed
    transform: scaleY(0)

  .open
    transform: scaleY(1)

  .stay
    z-index: 2

  .rel
    position: relative

</style>