<template>
  <section class="justify-center align-center">
    <div class="container" v-if="update === 'email'">
      <h2 style="margin-bottom: .5em">Update email</h2>
      <span class="h4">{{ response.msg || 'Waiting for server response...' }}</span><br>
      <span class="h4" v-if="response.success">You can close this tab now.</span>
    </div>

    <div class="container" v-if="update === 'password'">
      <h2 style="margin-bottom: .5em">Update password</h2>
      <span class="h4">Type your new password in the input area below</span>
      <div style="margin: 2.5em 0">
        <Input 
          icon="password" 
          type="password"
          label="New password"
          autocomplete="new-password"
          :validate="validatePassword"
          v-model:value="values.password"
          v-model:isValid="values.passwordValid"
          errorMessage="Use 8 or more characters with a mix of letters, capital letters and numbers."
          allowSpaces
        />
      </div>
      <Button @click="changePassword">Submit</Button>
    </div>

    <div class="container" v-if="update === 'delete'">
      <h2 style="margin-bottom: .5em">Delete account</h2>
      <span class="h4">{{ response.msg || 'Waiting for server response...' }}</span><br>
      <span class="h4" v-if="response.success">You can close this tab now.</span>
    </div>

  </section>
  <Popup v-if="update === 'password'" :success="response.success" :message="response.msg" @endAnimation="response.success = null" mobile />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { validatePassword } from "@/helpers/validator.helper";
import Input from "U#/Input.vue";
import Button from "U#/Button.vue";
import Popup from "U#/Popup.vue";
import { useAuthStore } from "S#/auth.store";

const [route, router] = [useRoute(), useRouter()];
const store = useAuthStore();
// This view is called with:
//   - JWT token query parameter
//   - Update query parameter (possible values: 'email', 'password', 'delete')

// If the password parameter is set to true, the view must render an Input to type the new password.
// If the page isn't called with the jwt token, return to login page
const { jwt, update } = route.query;
if (!jwt || !update) router.replace("/login");

const values = ref({});
const response = ref({ success: null, msg: "" });

const changePassword = async () => {
  if (!values.value.passwordValid) return;
  response.value = await store.changePassword(jwt, values.value.password);
  if (response.value.success) setTimeout(() => router.replace("/login"), 5000);
};

onMounted(async () => {
  if (update === "email") response.value = await store.changeEmail(jwt);
  else if (update === "delete") response.value = await store.deleteAccount(jwt);
});
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