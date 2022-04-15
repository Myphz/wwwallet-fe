<template>
  <header class="logo">
    <Logo small />
  </header>
  <main>
    <router-view />
  </main>
  <Footer v-if="path !== '/login' && path !== '/register'" />
  <Navbar />
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import Navbar from "M#/Navbar.mobile.vue";
import Logo from "U#/Logo.vue";
import Footer from "M#/Footer.mobile.vue";
import { computed } from "vue";

const route = useRoute();
const path = computed( () => route.path );
</script>

<style lang="sass">
  html
    font-size: 70%
    height: 100%

  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base

  main
    margin: 1.5em 5vw 10vh 5vw

  .logo
    padding: .5em 1.5em
    background-color: $bg-dark
</style>