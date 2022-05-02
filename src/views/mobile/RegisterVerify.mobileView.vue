<template>
  <section class="align-center justify-center">
    <div class="container">
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

      <Button>Resend email</Button>

    </div>
  </section>
</template>

<script setup>
import Button from "U#/Button.vue";
import Logo from "U#/Logo.vue";
</script>

<style lang="sass" scoped>
  $box-color: rgba(35, 74, 117, 0.5)

  section
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-image: linear-gradient(135deg, $bg-base 0%, rgba(0,6,13,1) 100%)

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