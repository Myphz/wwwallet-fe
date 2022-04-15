<template>
  <footer class="h5 text-secondary">
    <hr>
    <section class="main-section">
      <section>
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
      </section>

      <section>
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

  .main-section
    display: flex
    justify-content: space-between
    padding: 0 1em

    section
      display: flex
      flex-direction: column
      gap: 1.5em
    
  img
    width: 16px
    height: 16px

  footer
    margin: 0 5vw 2em 5vw
    padding-bottom: 10vh

    div
      display: flex
      flex-direction: column

    h4
      color: $text-primary

    a
      cursor: pointer
      &:active
        color: $text-primary
</style>