<template>
  <section class="bg-dark nohover nav-section" v-if="route.path !== '/'">
    <nav class="noselect">
      <ul>
        <li v-for="tab in tabs" :key="tab.endpoint[0]">
          <RouterLink
            :to="tab.endpoint[0]"
            :class="
              tab.endpoint.some((endpoint) => route.path.startsWith(endpoint))
                ? 'current-page'
                : ''
            "
          >
            <component :is="tab.icon" />
            <span>{{ tab.title }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const tabs = computed(() =>
  [
    {
      endpoint: ["/dashboard"],
      icon: "dashboard",
      title: "Dashboard",
    },
    {
      endpoint: ["/crypto"],
      icon: "chart",
      title: "Markets",
    },
    {
      endpoint: ["/wallet"],
      icon: "wallet",
      title: "Wallet",
    },
    {
      endpoint: route.params.isAuth
        ? ["/settings", "/login", "/register"]
        : ["/login", "/register", "/settings"],
      icon: "user",
      title: "Account",
    },
  ].map((tab) => ({
    ...tab,
    icon: defineAsyncComponent(() =>
      import(`../../assets/icons/${tab.icon}.svg`)
    ),
  }))
);
</script>

<style lang="sass">
.nav-section
  position: fixed
  bottom: 0
  width: 100%
  // Gotta defeat echarts' tooltip's z-index
  z-index: 9999999999

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
        stroke: $text-primary
</style>
