<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { RouterView } from "vue-router";
import routeHelper from "@/helpers/route.helper";

const Layout = defineAsyncComponent(() => routeHelper("Layout", "components"));
</script>
