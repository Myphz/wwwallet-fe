<template>
  <footer class="h5 text-secondary">
    <hr>
    <section class="space-between">
      <div>
        <h4>About Us</h4>
        <RouterLink to="/...">About</RouterLink>
        <RouterLink to="/...">License</RouterLink>
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
        <h4>Project</h4>
        <RouterLink to="/...">Contribute</RouterLink>
        <div class="align-center pointer" style="flex-direction: row; gap: .5em" @click="openLink('https://github.com/Myphz/wwwallet-fe')">
          <Icon icon="github" />
          <a>GitHub</a>
        </div>
      </div>

      <div>
        <h4>Contacts</h4>
        <RouterLink to="/...">Feedback</RouterLink>
      </div>

    </section>
  </footer>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import { RouterLink } from "vue-router";

const openLink = link => {
  window.open(link, "_blank");
}
</script>

<style lang="sass" scoped>
  hr
    margin-bottom: 1em
    border-color: $text-secondary
    
  footer
    margin: 10em 0 2em 0

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