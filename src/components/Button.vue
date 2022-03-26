<template>
  <button :style="styleVars" :type="submit ? 'submit' : null" :class="'text-white transition ' + btnClass">{{ text }}</button>
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
    },

    btnClass: {
      type: String,
      default: "h4 bg-primary rounded"
    },
  },
}
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  button
    border: none
    outline: none
    padding: 0 1em
    line-height: 2.5em
    text-transform: uppercase
    font-weight: bold
    cursor: pointer

  .bg-primary
    background-color: $primary
    &:hover
      background-color: darken($primary, 10%)

    &:active
      background-color: darken($primary, 20%)

  .bg-paper
    background-color: $bg-paper
    &:hover
      background-color: darken($bg-paper, 10%)

    &:active
      background-color: darken($bg-paper, 20%)

  .bg-dark
    background-color: $bg-dark
    &:hover
      background-color: darken($bg-dark, 2%)

    &:active
      background-color: darken($bg-dark, 5%)

  .rounded
    border-radius: .625em

  .bottom-rounded
    border-radius: 0 0 .625em .625em

</style>