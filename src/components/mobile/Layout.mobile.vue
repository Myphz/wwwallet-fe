<template>
  <main>
    <router-view />
  </main>
  <Navbar />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/mobile/Navbar.mobile.vue";
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

</style>