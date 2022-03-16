<template>
  <header class="search-bar align-center">
    <Icon :class="value ? 'icon-fill' : 'icon-empty'" />
    <input 
      type="text" 
      class="text-primary h3 search-input"
      v-model="value"
      spellcheck="false" 
      placeholder="Search token"
    >
  </header>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
const Icon = defineAsyncComponent(() => import("../assets/icons/search.svg"));
const value = ref("");
</script>

<style lang="sass">
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  .search-bar
    background: $bg-paper
    border-radius: 10px
    padding: .2em
    margin-bottom: 2em

  .search-input
    width: 100%
    border: none
    outline: none
    background: none

    &::placeholder
      color: $text-secondary

  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary

</style>