<template>
  <vue-progress-bar />
  <header v-if="$route.path !== '/'" class="logo">
    <Logo small />
  </header>

  <router-view v-slot="{ Component, route }">
    <Transition 
      :name="
        (route.path !== '/' && $router.options.history.state.back !== '/') &&
        (!NO_NAVBAR_PATHS.some(path => $route.path.startsWith(path) || $router.options.history?.state?.back?.startsWith(path))) 
        ? 'route' : ''" 
      mode="out-in"
    >
      <main :key="route.path">
        <component :is="Component" />
      </main>
    </Transition>
  </router-view>

  <Footer v-if="$route.path !== '/' && !NO_NAVBAR_PATHS.some(path => $route.path.startsWith(path))" />
  <Navbar />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "M#/Navbar.mobile.vue";
import Logo from "U#/Logo.vue";
import Footer from "M#/Footer.mobile.vue";

const NO_NAVBAR_PATHS = ["/login", "/register"];
</script>

<style lang="sass">
  html
    font-size: 70%
    height: 100%

  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base
    height: 100%
  
  #app
    height: 100%
    display: flex
    flex-direction: column
    & > *
      flex-shrink: 0

  main
    margin: 1.5em 5vw 4vh 5vw

  .logo
    padding: .5em 1.5em
    background-color: $bg-dark
</style>

<style lang="sass" scoped>
  .route-enter-from
    opacity: 0
    transform: translateX(5%)

  .route-enter-active
    transition: all 0.3s ease-out

  .route-leave-to
    opacity: 0
    transform: translateX(-5%)

  .route-leave-active
    transition: all 0.3s ease-in

</style>