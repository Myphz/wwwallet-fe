<template>
  <Layout />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import routeHelper from "@/helpers/route.helper";

const Layout = defineAsyncComponent(() => routeHelper("Layout", "components"));
</script>
