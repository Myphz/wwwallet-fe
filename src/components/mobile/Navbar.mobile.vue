<template>
  <section class="bg-dark nohover nav-section">
    <nav class="noselect">
      <ul>
        <li v-for="tab in tabs" :key="tab.endpoint">
          <RouterLink :to="tab.endpoint" :class="route.path.startsWith(tab.endpoint) ? 'current-page' : ''">
            <component :is="tab.icon" />
            <span>{{ tab.title }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { RouterLink, useRoute } from "vue-router";
const tabs = [
  {
    endpoint: "/crypto",
    icon: "chart",
    title: "Markets"
  },
  {
    endpoint: "/dashboard",
    icon: "dashboard",
    title: "Dashboard"
  },
  {
    endpoint: "/wallet",
    icon: "wallet",
    title: "Wallet"
  },
  {
    endpoint: "/login",
    icon: "user",
    title: "Account"
  },
].map(tab => (
  {...tab, icon: defineAsyncComponent(() => import(`../../assets/icons/${tab.icon}.svg`)) }
));

const route = useRoute();
</script>

<style lang="sass">
  .nav-section
    position: fixed
    bottom: 0
    width: 100%

    nav
      padding: .5em

    ul
      display: flex
      justify-content: space-around

    a
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      color: $text-secondary

      svg
        path
          fill: $text-secondary

    img
      width: 32px
      height: 32px

    .current-page
      color: $text-primary
      svg
        path
          fill: $text-primary

</style>