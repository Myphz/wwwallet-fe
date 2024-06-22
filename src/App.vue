<template>
  <Layout />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { routeComponent } from "@/helpers/route.helper";
import { useCryptoStore } from "S#/crypto.store";
import { useAuthStore } from "S#/auth.store";

const Layout = defineAsyncComponent(() => routeComponent("Layout"));
const cryptoStore = useCryptoStore();
const authStore = useAuthStore();

cryptoStore.init();
authStore.getTransactions();
</script>

<style lang="sass">
@use "/src/assets/sass/_utilities.sass" as *
</style>
