<template>
  <Navbar v-if="path != '/login' && path != '/register'" @navClick="navOpen = !navOpen" />
  <main>
    <!-- Pass the navbar status to the view (for the chart page) -->
    <router-view :navOpen="navOpen" />
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, RouterView } from "vue-router";
import Navbar from "@/components/mobile/Navbar.mobile.vue";

const route = useRoute();
const path = computed( () => route.path );
const navOpen = ref(false);
</script>

<style lang="sass">
  html
    font-size: 70%
    height: 100%

  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base
    min-height: 100%
    margin: 0

  main
    margin: 1.5em 5vw 0 5vw

</style>