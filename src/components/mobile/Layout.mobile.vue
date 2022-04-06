<template>
  <header class="logo">
    <Logo small />
  </header>
  <main>
    <router-view />
  </main>
  <Navbar />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "M#/Navbar.mobile.vue";
import Logo from "U#/Logo.vue";
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
    margin: 1.5em 5vw 1.5em 5vw
    padding-bottom: 10vh

  .logo
    padding: .5em 1.5em
    background-color: $bg-dark
</style>