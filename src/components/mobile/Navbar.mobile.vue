<template>
  <section class="bg-dark">
    <header class="noselect align-center">
      <Logo />
      <MenuIcon @click="openNavbar" />
    </header>
    
    <nav>
      <aside :class="'h1 bg-dark ' + (opened ? 'open' : 'closed')">
        <ul @click="openNavbar" >
          <li>
            <RouterLink to="/wallet">
              <Icon icon="wallet" />Wallet
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
    </nav>
    
  </section>
</template>

<script setup>
import Logo from "@/components/Logo.vue";
import { defineAsyncComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import Icon from "@/components/Icon.vue";
const MenuIcon = defineAsyncComponent(() => import("../../assets/icons/menu.svg"));

const opened = ref(false);
const emit = defineEmits(["navClick"]);

const openNavbar = () => {
  opened.value = !opened.value;
  emit("navClick");
}
</script>

<style lang="sass" scoped>
  section
    position: sticky
    top: 0

  header
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
    z-index: 9

  ul
    margin: 0 5vw

  li
    margin: .5em 0

  a
    display: flex
    align-items: center

  img
    margin-right: .5em
    width: 32px
    height: 32px

  .closed
    transform: scaleY(0)

  .open
    transform: scaleY(1)

  nav
    position: relative

</style>