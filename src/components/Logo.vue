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
  @use "/src/assets/sass/_utilities.sass" as *
  @import url('https://fonts.googleapis.com/css2?family=Rambla:ital,wght@1,700&display=swap')

  .box
    font-family: 'Rambla', sans-serif
    cursor: pointer

  img
    margin-right: 10px
</style>