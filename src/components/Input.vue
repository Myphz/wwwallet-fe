<template>
  <span class="container">
    <Icon class="icon" />
    <input type="text" :placeholder="capitalized">
  </span>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  icon: String,
  placeholder: String
});

const { icon } = props;
// Lazy loading component to import it from a string
// Import the svg directly using vite-svg-loader to style the icon
const Icon = defineAsyncComponent(() => import(`/src/assets/icons/${icon}.svg`))
const capitalized = icon[0].toUpperCase() + icon.substring(1);
</script>

<style lang="sass">
  @import "./src/assets/sass/_variable.sass"

  input
    border: none
    outline: none
    background: none
    margin-left: 5px
    color: $text-color
    font-size: 18px
    &::placeholder
      color: $text-color-secondary

  .container
    display: flex
    align-items: center
    border-bottom: 1.5px solid $text-color
    padding: 2px
    margin: 0
    margin-bottom: 30px

  .icon 
    path
      fill: $text-color-secondary
    
</style>