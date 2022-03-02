<template>
  <button :type="submit ? 'submit' : null">{{ text }}</button>
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

  button
    border: none
    outline: none
    background-color: $primary
    color: $white
    font-size: 16px
    line-height: 40px
    text-transform: uppercase
    font-weight: bold
    border-radius: 10px

</style>