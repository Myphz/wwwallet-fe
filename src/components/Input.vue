<template>
  <span>
    <div class="box-container align-center">
      <Icon :class="(value ? 'icon-fill ' : 'icon-empty ') + (iconSmall ? 'icon-small' : '')" />
      <span class="input-container">
        <input 
          :class="'text-primary ' + inputClasses"
          :type="type"
          v-model="value"
          @input="$emit('update:modelValue', $event.target.value)"
          @blur="validator"
          spellcheck="false"
          placeholder=" "
        >
        <label :class="'text-secondary ' + placeholderClasses">{{ placeholder }}</label>
      </span>
    </div>
    <div v-show="!isValid" class="text-red h6">
      {{ errorMessage }}
    </div>
  </span>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const { icon, validate, startValue } = defineProps({
  icon: {
    type: String,
    required: true
  },

  placeholder: {
    type: String,
    required: true
  },

  startValue: {
    type: [String, Number],
    default: ""
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
  },

  iconSmall: {
    type: Boolean,
    default: false
  },

  inputClasses: {
    type: String,
    default: "h5"
  },

  placeholderClasses: {
    type: String,
    default: "h5"
  }
});

// Lazy loading component to import it from a string
// Import the svg directly using vite-svg-loader to style the icon
const Icon = defineAsyncComponent(() => import(`../assets/icons/${icon}.svg`));
const value = ref(startValue);
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

<style lang="sass">
  input
    border: none
    outline: none
    background: none
    margin-left: 5px
    width: 100%

    &:focus + label, &:not(&:placeholder-shown) + label
      top: -2em
      font-size: nth($font-sizes, 5)
  
  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0
      
  .box-container
    border-bottom: 1px solid $text-primary
    width: 100%

  .input-container
    position: relative
    width: 70%
    max-width: 70%

  label
    position: absolute
    top: -.09em
    left: .375em
    transition: 0.2s ease all
    pointer-events: none

  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary

  .icon-small
    transform: scale(.5)
    
</style>