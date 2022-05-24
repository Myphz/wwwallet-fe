<template>
  <Layout />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { routeComponent } from "@/helpers/route.helper";
import { useCryptoStore } from "S#/crypto.store";
import { useAuthStore } from "S#/auth.store";
import mixpanel from "mixpanel-browser";

const Layout = defineAsyncComponent(() => routeComponent("Layout"));
const cryptoStore = useCryptoStore();
const authStore = useAuthStore();

cryptoStore.init();
authStore.getTransactions();
mixpanel.init('c313b26749d483ff5ccd3b1729dfcc2d', {persistence: "localStorage"});
mixpanel.track('Page View');
</script>

<style lang="sass">
  @use "/src/assets/sass/_utilities.sass" as *
</style>