<template>
  <Navbar v-if="path != '/login' && path != '/register'"/>
  <main>
    <router-view />
  </main>

  <Footer />
</template>

<script setup>
import { computed } from "vue";
import { useRoute, RouterView } from "vue-router";
import Navbar from "D#/Navbar.vue";
import Footer from "D#/Footer.vue";

const route = useRoute();
const path = computed( () => route.path );
</script>

<style lang="sass">
  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base
    margin: 0 16.66vw
</style>