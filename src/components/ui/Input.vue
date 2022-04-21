<template>
  <span>
    <div class="box-container align-center">
      <Icon :class="(value ? 'icon-fill ' : 'icon-empty ') + (iconSmall ? 'icon-small' : '')" />
      <span class="input-container">
        <input 
          :class="'text-primary ' + inputClasses"
          :type="type"
          :name="icon"
          v-model="value"
          @input="$emit('update:value', $event.target.value)"
          @blur="validator(); $emit('update:isValid', isValid)"
          spellcheck="false"
          autocapitalize="none"
          placeholder=" "
        >
        <label :class="'text-secondary ' + placeholderClasses">{{ placeholder }}</label>
      </span>
    </div>
    <div v-show="!isValid && value" class="error text-red h6">
      <span>{{ errorMessage }}</span>
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
    default: "h4"
  },

  placeholderClasses: {
    type: String,
    default: "h4"
  }
});

// Lazy loading component to import it from a string
// Import the svg directly using vite-svg-loader to style the icon
const Icon = defineAsyncComponent(() => import(`../../assets/icons/${icon}.svg`));
const value = ref(startValue);
let isValid = ref(true);

const validator = () => {
  // If the field is empty, there's nothing to validate
  if (!value.value) {
    isValid.value = false;
    return;
  }
  isValid.value = validate(value.value);
}
</script>

<style lang="sass" scoped>
  .box-container
    border-bottom: 1px solid $text-primary
    width: 100%

  .input-container
    position: relative
    width: 70%
    max-width: 70%

  label
    position: absolute
    top: -.2em
    left: .375em
    transition: 0.2s ease all
    pointer-events: none

  .error
    display: flex

    span
      flex-grow: 1
      width: 0


</style>

<style lang="sass">
  .icon-empty, .icon.fill
    margin-top: -.2em

  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary

  .icon-small
    transform: scale(.5)
</style>