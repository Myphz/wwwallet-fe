<template>
  <footer :class="'h5 text-secondary ' + (fixed ? 'footer-fixed' : '')">
    <section class="main-section">
      <section>
        <div>
          <h4>About Us</h4>
          <a href="https://github.com/Myphz/wwwallet-fe/blob/main/LICENSE" target="_blank">License</a>
          <RouterLink to="/privacypolicy">Privacy Policy</RouterLink>
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
          <RouterLink to="/">Contribute</RouterLink>
          <div class="align-center pointer" style="flex-direction: row; gap: .5em" @click="openLink('https://github.com/Myphz/wwwallet-fe')">
            <Icon icon="github" />
            <a>GitHub</a>
          </div>
        </div>

        <div>
          <h4>Contacts</h4>
          <a href="mailto:contact@wwwallet.app">Email</a>
          <RouterLink to="/">Feedback</RouterLink>
        </div>
      </section>
    </section>

    
  </footer>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const fixed = ref(false);
const observer = new ResizeObserver(() => fixed.value = window.innerHeight > document.body.scrollHeight + 64);
observer.observe(document.body);

const openLink = link => {
  window.open(link, "_blank");
}
</script>

<style lang="sass" scoped>
  footer
    padding: 2em 5vw 11vh 5vw
    background-color: $bg-dark

  .footer-fixed
    position: fixed
    bottom: 0
    left: 0
    width: calc(100% - 10vw)

  .main-section
    display: flex
    justify-content: space-around
    padding: 0 1em

    section
      display: flex
      flex-direction: column
      gap: 1.5em
    
  img
    width: 16px
    height: 16px

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