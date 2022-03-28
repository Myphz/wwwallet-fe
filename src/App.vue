<template>
  <Layout />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { routeComponent } from "@/helpers/route.helper";

const Layout = defineAsyncComponent(() => routeComponent("Layout"));
</script>
