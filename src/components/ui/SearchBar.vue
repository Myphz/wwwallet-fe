<template>
  <header class="search-bar align-center">
    <Icon :class="'icon ' + (filled ? 'icon-fill' : 'icon-empty')" />
    <input 
      type="text" 
      class="text-primary h4 search-input"
      oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);"
      spellcheck="false" 
      placeholder="Search ticker"
      @input="$emit('update:modelValue', $event.target.value.toUpperCase());filled=!!$event.target.value.length"
      @keydown.space.prevent
    >
  </header>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
const Icon = defineAsyncComponent(() => import("../../assets/icons/search.svg"));
const filled = ref(false);
</script>

<style lang="sass" scoped>
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
</style>

<style lang="sass">
  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary

</style>