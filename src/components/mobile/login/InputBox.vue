<template>
  <div>
    <Logo />
    <h2>{{ header }}</h2>
    <form @submit.prevent="submit">
      <Input 
        class="input" 
        icon="email" 
        placeholder="Email" 
        v-model:value="values.email"
        v-model:isValid="areValuesValid[0]"
        :validate="validateEmail"
        errorMessage="Invalid email"
      />

      <Input
        class="input"
        icon="password"
        placeholder="Password"
        type="password"
        v-model:value="values.password"
        v-model:isValid="areValuesValid[1]"
        :validate="login ? undefined : validatePassword"
        errorMessage="Use 8 or more characters with a mix of letters, capital letters and numbers."
      />

      <Input
        v-if="!login"
        class="input"
        icon="password"
        placeholder="Confirm password"
        type="password"
        v-model:value="values.confirmPassword"
        v-model:isValid="areValuesValid[2]"
        :validate="passwordEqual"
        errorMessage="The passwords don't match"
      />

      <span v-if="login" class="forgot h6 link">Forgot your password?</span>
      <Button class="btn" submit>{{ header }}</Button>
    </form>

    <span class="h6 text-secondary">
      <span>{{ subtext }}</span>
      <RouterLink v-if="login" class="link" to="/register"> Sign up</RouterLink>
      <RouterLink v-else class="link" to="/login"> Login</RouterLink>
    </span>
  </div>
</template>

<script setup>
import Logo from "U#/Logo.vue";
import Input from "U#/Input.vue";
import Button from "U#/Button.vue";
import { useAuthStore } from "S#/auth.store";
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import { validateEmail, validatePassword } from "@/helpers/validator.helper";

const { login } = defineProps({
  login: {
    type: Boolean,
    default: false
  }
});

const store = useAuthStore();
const values = reactive({});
// Reactive array to check if the input fields are valid or not. The size of the array is 3 if it's a register route (as there are 3 forms to validate), 2 if it's login.
const areValuesValid = reactive(new Array(2 + !login).fill(false));
const passwordEqual = () => values.password === values.confirmPassword;

let subtext, header, submit;

if (login) {
  header = "Login";
  subtext = "Don't have an account?";
  submit = () => { 
    // Guard clause to check if all the values are valid before sending the request to backend
    if (areValuesValid.some(v => !v)) return; 
    store.login(values);
  };
} else {
  header = "Register";
  subtext = "Already have an account?";
  submit = () => { 
    // Guard clause to check if all the values are valid before sending the request to backend
    if (areValuesValid.some(v => !v)) return; 
    store.register(values);
  };
}

</script>

<style lang="sass" scoped>
  $box-color: rgba(35, 74, 117, 0.5)

  div
    position: absolute
    padding: 1em 2.6em
    border-radius: 1em
    background-color: $box-color
    backdrop-filter: blur(12px)
    left: 50%
    top: 50%
    min-width: 60%
    transform: translateX(-50%) translateY(-50%)

  h2
    margin: 0.5em 0

  form
    display: flex
    flex-direction: column

  .input
    margin: 1.5em 0

  .forgot
    margin-left: auto

  .btn
    margin: 0.625em 0
    width: 100%
    

</style>