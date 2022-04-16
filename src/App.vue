<template>
  <Layout />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { routeComponent } from "@/helpers/route.helper";
import { useCryptoStore } from "S#/crypto.store";
const Layout = defineAsyncComponent(() => routeComponent("Layout"));
const store = useCryptoStore();
store.init();
</script>

<style lang="sass">
  @use "/src/assets/sass/_utilities.sass" as *
</style>