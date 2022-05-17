<template>
  <section>
    <div class="container">
      <h2>{{ header }}</h2>
      <form @submit.prevent="submit">
        <Input 
          class="input" 
          icon="email" 
          label="Email" 
          v-model:value="values.email"
          v-model:isValid="areValuesValid[0]"
          :validate="validateEmail"
          autocomplete="email"
          errorMessage="Invalid email"
        />

        <Input
          class="input"
          icon="password"
          label="Password"
          type="password"
          v-model:value="values.password"
          v-model:isValid="areValuesValid[1]"
          :validate="login ? undefined : validatePassword"
          errorMessage="Use 6 or more characters with a mix of letters, capital letters and numbers."
          allowSpaces
        />

        <Input
          v-if="!login"
          class="input"
          icon="password"
          label="Confirm password"
          type="password"
          v-model:value="values.confirmPassword"
          v-model:isValid="areValuesValid[2]"
          :validate="passwordEqual"
          errorMessage="The passwords don't match"
          allowSpaces
        />

        <RouterLink v-if="login" to="/forgot" class="forgot h6 link">Forgot your password?</RouterLink>
        <Button class="btn" submit>{{ header }}</Button>
      </form>

      <span class="h6 text-secondary">
        <span>{{ subtext }}&nbsp;</span>
        <RouterLink v-if="login" class="link" to="/register">Sign up</RouterLink>
        <RouterLink v-else class="link" to="/login">Login</RouterLink>
        <span v-if="!login" class="h6 text-secondary"><br>I agree to the <RouterLink class="link" to="/privacypolicy">Privacy Policy</RouterLink></span>
      </span>
    </div>
  </section>
  <Popup :success="requestSuccess" :message="requestMessage" @endAnimation="requestSuccess = null" mobile />
</template>

<script setup>
import Input from "U#/Input.vue";
import Button from "U#/Button.vue";
import Popup from "U#/Popup.vue";
import { useAuthStore } from "S#/auth.store";
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { validateEmail, validatePassword } from "@/helpers/validator.helper";

const { login, redirect } = defineProps({
  login: {
    type: Boolean,
    default: false
  },

  redirect: {
    // Accept Strings & undefined
    validator: prop => typeof prop === "string" || typeof prop === "undefined",
  }
});

const router = useRouter();
const store = useAuthStore();
const values = reactive({});
// Reactive array to check if the input fields are valid or not. The size of the array is 3 if it's a register route (as there are 3 forms to validate), 2 if it's login.
const areValuesValid = reactive(new Array(2 + !login).fill(false));
const passwordEqual = () => values.password === values.confirmPassword;

const requestSuccess = ref(null);
const requestMessage = ref("");

let subtext, header, submit;

if (login) {
  header = "Login";
  subtext = "Don't have an account?";
  submit = async () => { 
    // Guard clause to check if all the values are valid before sending the request to backend
    if (areValuesValid.some(v => !v)) return; 

    const res = await store.login(values);
    if (!res) return;
    const { success, msg } = res;
    
    if (!success) {
      requestSuccess.value = false;
      requestMessage.value = msg;
    } else {
      router.push(redirect || "/dashboard");
    }
  };
} else {
  header = "Register";
  subtext = "Already have an account?";
  submit = async () => { 
    // Guard clause to check if all the values are valid before sending the request to backend
    if (areValuesValid.some(v => !v)) return; 
    const { success, msg } = await store.register(values);
    if (!success) {
      requestSuccess.value = false;
      requestMessage.value = msg;
    } else {
      router.push({ name: "verify", params: { email: values.email, password: values.password } });
    }
  };
}

</script>

<style lang="sass" scoped>
  $box-color: rgba(35, 74, 117, 0.5)

  .container
    padding: 1em 2.6em
    border-radius: 1em
    background-color: $box-color
    backdrop-filter: blur(12px)
    text-align: left

  h2
    margin: 0.5em 0

  form
    display: flex
    flex-direction: column

  section
    display: inline-block
    margin-bottom: 5em

  .input
    margin: 1em 0

  .forgot
    margin: 0.3em 0
    margin-left: auto

  .btn
    margin: 0.625em 0
    width: 100%

</style>