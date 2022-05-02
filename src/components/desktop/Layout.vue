<template>
  <Navbar v-if="!NO_NAVBAR_PATHS.some(path => $route.path.startsWith(path))" />
  <main>
    <router-view />
  </main>
  <Footer v-if="!NO_NAVBAR_PATHS.some(path => $route.path.startsWith(path))" />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "D#/Navbar.vue";
import Footer from "D#/Footer.vue";

const NO_NAVBAR_PATHS = ["/login", "/register"];
</script>

<style lang="sass">
  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base
    margin: 0 16.66vw
</style>