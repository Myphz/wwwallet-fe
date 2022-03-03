<template>
  <span class="container">
    <Icon :class="isFilled ? 'icon-fill' : 'icon-empty'" style="" />
    <input 
      class="h3 text-primary" 
      type="text" 
      :placeholder="capitalized"
      v-model="isFilled"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </span>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const props = defineProps({
  icon: String,
  placeholder: String
});

const { icon } = props;
// Lazy loading component to import it from a string
// Import the svg directly using vite-svg-loader to style the icon
const Icon = defineAsyncComponent(() => import(`/src/assets/icons/${icon}.svg`))
const capitalized = icon[0].toUpperCase() + icon.substring(1);
const isFilled = ref("");
</script>

<style lang="sass">
  @import "/src/assets/sass/_variable.sass"
  @import "/src/assets/sass/_utilities.sass"

  input
    border: none
    outline: none
    background: none
    margin-left: 5px
    &::placeholder
      color: $text-secondary

  .container
    display: flex
    align-items: center
    border-bottom: 1px solid $text-primary
    padding: 2px

  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary
    
</style>