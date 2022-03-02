<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute();
const path = computed( () => route.path );
</script>

<template>
  <Navbar v-if="path != '/login' && path != '/register'"/>
  <main>
    <RouterView />
  </main>
</template>

<style lang="sass">
  @import "./src/assets/sass/_variable.sass"
  
  body
    background-color: $bg-base
    color: $text-color
    font-family: $font-base
    margin: 0 16.66vw
</style>
