<template>
  <Navbar class="margin" v-if="$route.path !== '/' && !NO_NAVBAR_PATHS.some(path => $route.path.startsWith(path))" />

  <router-view v-slot="{ Component, route }">
    <Transition 
      :name="
        (route.path !== '/' && $router.options.history.state.back !== '/') &&
        (!NO_NAVBAR_PATHS.some(path => $route.path.startsWith(path) || $router.options.history?.state?.back?.startsWith(path))) 
        ? 'route' : ''" 
      mode="out-in"
    >
      <main :key="route.path" class="margin">
        <component :is="Component" />
      </main>
    </Transition>
  </router-view>

  <Footer v-if="$route.path !== '/' && !NO_NAVBAR_PATHS.some(path => $route.path.startsWith(path))" />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "D#/Navbar.vue";
import Footer from "D#/Footer.vue";

const NO_NAVBAR_PATHS = ["/login", "/register", "/confirm", "/forgot"];
</script>

<style lang="sass">
  html, body, #app
    height: 100%

  body
    background-color: $bg-base
    color: $text-primary
    font-family: $font-base
    scroll-behavior: smooth

  .margin
    margin: 0 16.66vw

  #app
    display: flex
    flex-direction: column
    & > *
      flex-shrink: 0

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