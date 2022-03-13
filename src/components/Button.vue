<template>
  <button :type="submit ? 'submit' : null" class="h3 text-white transition">{{ text }}</button>
</template>

<script>
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
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  button
    border: none
    outline: none
    background-color: $primary
    line-height: 2.5em
    text-transform: uppercase
    font-weight: bold
    border-radius: 0.625em

    &:hover
      background-color: darken($primary, 10%)

    &:active
      background-color: darken($primary, 20%)
      
</style>