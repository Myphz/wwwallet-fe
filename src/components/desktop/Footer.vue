<template>
  <footer class="h5 text-secondary">
    <section class="space-between">
      <div>
        <h4>About Us</h4>
        <RouterLink to="/privacypolicy">Privacy Policy</RouterLink>
        <RouterLink to="/cookiepolicy">Cookie Policy</RouterLink>
      </div>

      <div>
        <h4>Explore</h4>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/wallet">Wallet</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </div>

      <div>
        <h4>Contacts</h4>
        <a href="mailto:contact@wwwallet.app">contact@wwwallet.app</a>
        <RouterLink to="/feedback">Feedback</RouterLink>
      </div>
    </section>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style lang="sass" scoped>
footer
  margin-top: 4em
  flex-grow: 1
  width: 100%
  background-color: $bg-dark

section
  margin: 2em 0
  display: flex
  justify-content: space-around

div
  display: flex
  flex-direction: column

h4
  color: $text-primary

a
  cursor: pointer
  &:hover
    color: $text-primary
</style>
