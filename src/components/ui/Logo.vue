<template>
  <RouterLink custom v-slot="{ navigate }" to="/">
    <span class="box align-center noselect" @click="navigate">
      <Icon icon="logo" :class="small ? 'small' : ''" />
      <h1>wwwallet</h1>
    </span>
  </RouterLink>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import { RouterLink } from "vue-router";

defineProps({
  small: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="sass" scoped>
  .box
    font-family: 'Rambla', sans-serif
    cursor: pointer

  img
    margin-right: 10px

  .small
    width: 36px
    height: 36px

</style>