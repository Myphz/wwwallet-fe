<template>
  <span>
    <span class="container align-center">
      <Icon :class="value ? 'icon-fill' : 'icon-empty'" />
      <span class="input-container">
        <input 
          class="h4 text-primary"
          :type="type"
          v-model="value"
          @input="$emit('update:modelValue', $event.target.value)"
          v-on:blur="validator"
          spellcheck="false"
          placeholder=" "
        >
        <label class="text-secondary h4">{{ placeholder }}</label>
      </span>
    </span>
    <div v-show="!isValid" class="text-red h5">
      {{ errorMessage }}
    </div>
  </span>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const { icon, placeholder, type, validate, errorMessage } = defineProps({
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
  },

  validate: {
    type: Function,
    default: _ => true
  },

  errorMessage: {
    type: String,
    default: ""
  }
});

// Lazy loading component to import it from a string
// Import the svg directly using vite-svg-loader to style the icon
const Icon = defineAsyncComponent(() => import(`../assets/icons/${icon}.svg`));
const value = ref("");
let isValid = ref(true);

const validator = () => {
  // If the field is empty, there's nothing to validate
  if (!value.value) {
    isValid.value = true;
    return;
  }
  isValid.value = validate(value.value);
}
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  input
    border: none
    outline: none
    background: none
    margin-left: 5px

    &:focus + label, &:not(&:placeholder-shown) + label
      top: -25px
      font-size: nth($font-sizes, 5)
  
  .container
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