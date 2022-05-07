<template>
  <section class="justify-center align-center">
    <div class="container">
      <h2 style="margin-bottom: .5em">Forgot password</h2>
      <span class="h4">Type your email in the input area below to receive a link<br>to reset your password</span>
      <div style="margin: 2.5em 0">
        <Input 
          icon="email" 
          label="Email"
          autocomplete="email"
          :validate="validateEmail"
          v-model:value="values.email"
          v-model:isValid="values.emailValid"
          errorMessage="Invalid email"
        />
      </div>
      <Button @click="resetPassword">Submit</Button>
    </div>
  </section>
  <Popup :success="response.success" :message="response.msg" @endAnimation="response.success = null" mobile />
</template>

<script setup>
import { validateEmail } from "@/helpers/validator.helper";
import Input from "U#/Input.vue";
import Button from "U#/Button.vue";
import Popup from "U#/Popup.vue";
import { ref } from "vue";
import { useAuthStore } from "S#/auth.store";

const store = useAuthStore();

const values = ref({});
const response = ref({ success: null, msg: "" });

const resetPassword = async () => {
  if (!values.value.emailValid) return;
  response.value = await store.forgotPassword(values.value.email);
};
</script>

<style lang="sass" scoped>
  $box-color: rgba(35, 74, 117, 0.5)

  section
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: calc(100% - 60px)
    background-image: linear-gradient(135deg, $bg-base 0%, rgba(0,6,13,1) 100%)

  .container
    min-width: 25vw
    max-width: 80%
    padding: 1.5em
    border-radius: 1em
    background-color: $box-color
    backdrop-filter: blur(12px)
</style>