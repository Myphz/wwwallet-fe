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
  @use "/src/assets/sass/_variable.sass" as *
  @use "/src/assets/sass/_mixins.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *
  
  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base
    margin: 0 16.66vw
    
    @include phone
      margin: 0

</style>
