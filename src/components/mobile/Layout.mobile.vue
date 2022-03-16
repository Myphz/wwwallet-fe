<template>
  <div>
    <Navbar v-if="path != '/login' && path != '/register'" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/mobile/Navbar.mobile.vue";

const route = useRoute();
const path = computed( () => route.path );
</script>

<style lang="sass">
  @use "/src/assets/sass/_variables.sass" as *

  html
    font-size: 62.5%
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