<template>
  <header class="search-bar align-center">
    <Icon :class="'icon ' + (value ? 'icon-fill' : 'icon-empty')" />
    <input 
      type="text" 
      class="text-primary h4 search-input"
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
  .search-bar
    background: $bg-paper
    border-radius: 1em
    padding: .5em
    margin-bottom: 2em

  .search-input
    width: 100%
    border: none
    outline: none
    background: none

    &::placeholder
      color: $text-secondary

  .icon
    margin-right: .5em

  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary

</style>