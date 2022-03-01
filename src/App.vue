<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style lang="sass">
  body
    background-color: $bg-base
    color: $text-color
    font-family: $font-base
    margin: 0 16.66vw
</style>
