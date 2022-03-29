<template>
  <div>
    <Logo />
    <h2>{{ header }}</h2>
    <form @submit.prevent="null">
      <Input 
        class="input" 
        icon="email" 
        placeholder="Email" 
        v-model="values.username" 
        :validate="validateEmail"
        errorMessage="Invalid email"
      />

      <Input
        class="input"
        icon="password"
        placeholder="Password"
        type="password"
        v-model="values.password"
        :validate="login ? undefined : validatePassword"
        errorMessage="Use 8 or more characters with a mix of letters, capital letters and numbers."
      />

      <Input
        v-if="!login"
        class="input"
        icon="password"
        placeholder="Confirm password"
        type="password"
        v-model="values.confirmPassword"
        :validate="passwordEqual"
        errorMessage="The passwords don't match"
      />

      <span v-if="login" class="forgot h6 link">Forgot your password?</span>
      <Button class="btn" :text="header" submit />
    </form>

    <span class="h6 text-secondary">
      <span>{{ subtext }}</span>
      <RouterLink v-if="login" class="link" to="/register"> Sign up</RouterLink>
      <RouterLink v-else class="link" to="/login"> Login</RouterLink>
    </span>
  </div>
</template>

<script setup>
import Logo from "./Logo.vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import { validateEmail, validatePassword } from "../helpers/validator.helper";

const { login } = defineProps({
  login: {
    type: Boolean,
    default: false
  }
});

let subtext, header;

if (login) {
  header = "Login";
  subtext = "Don't have an account?";
} else {
  header = "Register";
  subtext = "Already have an account?";
}

const values = reactive({});
const passwordEqual = _ => values.password === values.confirmPassword;
</script>

<style lang="sass" scoped>
  $box-color: rgba(35, 74, 117, 0.5)

  div
    position: absolute
    top: 20%
    width: 20em
    padding: 1em 2.6em
    border-radius: 1em
    background-color: $box-color
    backdrop-filter: blur(12px)
    max-width: 60vw

    @media (max-width: 1440px)
      // Middle
      left: 50%
      top: 50%
      transform: translateX(-50%) translateY(-50%)

  h2
    margin: 0.5em 0

  form
    display: flex
    flex-direction: column

  .input
    margin: 1em 0

  .forgot
    margin-left: auto

  .btn
    margin: 0.625em 0
    width: 100%
    

</style>