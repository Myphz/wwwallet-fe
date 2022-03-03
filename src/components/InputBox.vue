<template>
  <div>
    <Logo />
    <h2 class="h2">{{ header }}</h2>
    <form @submit.prevent="a">
      <Input icon="email" placeholder="Email" class="input" v-model="values.username" />
      <Input icon="password" placeholder="Password" type="password" class="input" v-model="values.password" />
      <Input v-if="!login" icon="password" placeholder="Confirm password" type="password" class="input" v-model="values.confirmPassword" />

      <span v-if="login" class="forgot h4 link">Forgot your password?</span>
      <Button class="btn" :text="header" submit />
    </form>

    <span class="h4 text-secondary">
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

const { login } = defineProps({
  login: {
    type: Boolean,
    default: false
  }
});

let subtext, header;

if (login) {
  subtext = "Don't have an account?";
  header = "Login";
} else {
  subtext = "Already have an account?";
  header = "Register";
}

const values = reactive({});
</script>

<style lang="sass" scoped>
  @import "/src/assets/sass/_utilities.sass"
  @import "/src/assets/sass/_mixins.sass"

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

    @include phone
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