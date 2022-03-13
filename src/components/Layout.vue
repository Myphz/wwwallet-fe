<template>
  <div>
    <Navbar v-if="path != '/login' && path != '/register'"/>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";

const route = useRoute();
const path = computed( () => route.path );
</script>

<style lang="sass">
  @use "/src/assets/sass/_variables.sass" as *

  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base
    margin: 0 16.66vw

</style>