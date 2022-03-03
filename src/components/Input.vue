<template>
  <span class="container">
    <Icon :class="isFilled ? 'icon-fill' : 'icon icon-empty'" />
    <span class="input-container">
      <input 
        class="h3 text-primary"
        :type="type"
        v-model="isFilled"
        @input="$emit('update:modelValue', $event.target.value)"
        spellcheck="false"
        placeholder=" "
      >
      <label class="text-secondary h3">{{ placeholder }}</label>
    </span>
  </span>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const { icon, placeholder, type } = defineProps({
  icon: {
    type: String,
    required: true
  },

  placeholder: {
    type: String,
    required: true
  },

  type: {
    type: String,
    default: "text"
  }
});

// Lazy loading component to import it from a string
// Import the svg directly using vite-svg-loader to style the icon
const Icon = defineAsyncComponent(() => import(`/src/assets/icons/${icon}.svg`))
const isFilled = ref("");
</script>

<style lang="sass" scoped>
  @import "/src/assets/sass/_variable.sass"
  @import "/src/assets/sass/_utilities.sass"
  @import "/src/assets/sass/_mixins.sass"

  input
    border: none
    outline: none
    background: none
    margin-left: 5px

    &:focus + label, &:not(&:placeholder-shown) + label
      top: -25px
  
  .container
    display: flex
    align-items: center
    border-bottom: 1px solid $text-primary
    padding: 2px

  .input-container
    width: auto
    height: auto
    position: relative
    max-width: 90%

  label
    position: absolute
    top: -1px
    left: 6px
    transition: 0.2s ease all
    pointer-events: none

  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary
    
</style>