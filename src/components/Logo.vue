<template>
  <RouterLink custom v-slot="{ navigate }" to="/">
    <span class="box align-center noselect" @click="navigate">
      <Icon icon="logo" />
      <h1>wwwallet</h1>
    </span>
  </RouterLink>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { RouterLink } from "vue-router";
</script>

<style lang="sass" scoped>
  .box
    font-family: 'Rambla', sans-serif
    cursor: pointer

  img
    margin-right: 10px
</style>