<template>
  <div>
    <Logo />
    <h2 class="h2">Login</h2>
    <form action="">
      <Input icon="email" class="input" />
      <Input icon="password" class="input" />
      <span v-if="login" class="forgot h4">Forgot your password?</span>
      <Button class="btn" text="login" submit />
    </form>
    <span class="subtext h4">{{ subtext }}</span>
  </div>
</template>

<script setup>
import Logo from './Logo.vue';
import Input from './Input.vue';
import Button from './Button.vue';

const { subtext } = defineProps({
  subtext: {
    type: String,
    required: true
  },

  login: {
    type: Boolean,
    required: true
  }
});
</script>

<style lang="sass" scoped>
  @import "./src/assets/sass/_variable.sass"
  @import "./src/assets/sass/_utilities.sass"

  div
    position: absolute
    top: 20%
    width: 20em
    max-width: 20em
    padding: 1em 2.6em
    border-radius: 1em
    background-color: rgba(35, 74, 117, 0.5)
    backdrop-filter: blur(12px)

  h2
    margin: 0.5em 0

  form
    display: flex
    flex-direction: column

  .input
    margin: 1em 0

  .forgot
    display: flex
    justify-content: right
    
  .subtext, .forgot
    color: $text-color-secondary

  .btn
    margin: 0.625em 0
    width: 100%
    

</style>