<template>
  <div>
    <Logo />
    <h2 class="h2">Login</h2>
    <form @submit.prevent="a">
      <Input icon="email" class="input" v-model="values.username" />
      <Input icon="password" class="input" v-model="values.password" />
      <span v-if="login" class="forgot h4 link">Forgot your password?</span>
      <Button class="btn" text="login" submit />
    </form>

    <span class="h4 text-secondary">
      <span>{{ subtext }}</span>
      <span v-if="login" class="link"> Sign up</span>
    </span>

  </div>
</template>

<script setup>
import Logo from "./Logo.vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { reactive } from "vue";

const { login } = defineProps({
  login: {
    type: Boolean,
    required: true
  }
});

const subtext = login ? "Don't have an account?" : "";
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