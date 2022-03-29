<template>
  <Layout />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { routeComponent } from "@/helpers/route.helper";

const Layout = defineAsyncComponent(() => routeComponent("Layout"));
</script>

<style lang="sass">
  @use "/src/assets/sass/_utilities.sass" as *
</style>