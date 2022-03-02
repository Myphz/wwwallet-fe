<template>
  <button :type="submit ? 'submit' : null" class="h3">{{ text }}</button>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    text: {
      type: String,
      required: true
    },

    submit: {
      type: Boolean,
      default: false
    }
  },

  setup ({ text, submit }) {
    return { text, submit };
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/assets/sass/_variable.sass"
  @import "./src/assets/sass/_utilities.sass"

  button
    border: none
    outline: none
    background-color: $primary
    color: $white
    line-height: 2.5em
    text-transform: uppercase
    font-weight: bold
    border-radius: 0.625em
    transition: all 0.1s

    &:hover
      background-color: darken($primary, 10%)

    &:active
      background-color: darken($primary, 20%)
      
</style>