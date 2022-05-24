<template>
  <section class="align-center justify-center">
    <div class="container" v-if="email">
      <Logo small />
      <hr style="margin: 1em 0">
      <p class="h4">
        The account has been successfully created.<br>
        Please check your email to verify your account.
      </p>

      <h3 style="margin: 1em 0; font-weight: bold">{{ $route.params.email }}</h3>

      <p class="h5" style="margin-bottom: 1em">
        If the email is wrong, please register again.<br>
      </p>

      <Button @click="resend">Resend email</Button>
    </div>
    <div class="container" v-else>
      <Logo />
      <hr style="margin: 1em 0">
      <p class="h4">
        {{ request.msg }}
        <span v-if="request.success"><br>You will be redirected in 5 seconds...</span>
      </p>
    </div>
  </section>
  <Popup v-if="email" :success="request.success" :message="request.msg" @endAnimation="request.success = null" />
</template>

<script setup>
import Button from "U#/Button.vue";
import Logo from "U#/Logo.vue";
import Popup from "U#/Popup.vue";
import { useAuthStore } from "S#/auth.store";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import mixpanel from "mixpanel-browser";

const store = useAuthStore();
const [route, router] = [useRoute(), useRouter()];

// This page can be called in 2 different ways:
// 1) After register / after login if the email is not verified (with email and password as route params)
// 2) To verify email from the email link (with jwt as query)
// Try to take all the parameters, and redirect to the login page if none of these work.
const { email, password } = route.params;
const jwt = route.query.jwt;
if ((!email || !password) && !jwt) router.replace("/login");

const request = ref({ success: null, msg: "" });

// If the page has been rendered with the jwt token, try to verify the account on mount
if (jwt)
  onMounted(async () => {
    request.value.msg = "Verifying email...";
    request.value = await store.verify(jwt);
    if (request.value.success) {
      mixpanel.track("Email verified");
      setTimeout(() => router.replace("/dashboard"), 5000);
    }
  });

const resend = async () => {
  request.value = await store.register({ email, password, resend: true });
}
</script>

<style lang="sass" scoped>
  $box-color: rgba(35, 74, 117, 0.5)

  section
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: calc(100% - 60px)
    background-image: $gradient

  .container
    padding: 3em 2.6em
    border-radius: 1em
    width: 70%
    background-color: $box-color
    backdrop-filter: blur(12px)

  h3, h4, h5
    font-weight: normal

  hr
    background-color: $text-secondary
    border: 1px solid $text-secondary
</style>