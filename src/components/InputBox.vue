<template>
  <div>
    <Logo />
    <h2>Login</h2>
    <form action="">
      <Input icon="email" />
      <Input icon="password" />
    </form>
  </div>
</template>

<script setup>
import Logo from './Logo.vue';
import Input from './Input.vue';
</script>

<style lang="sass" scoped>
  @import "./src/assets/sass/_variable.sass"
  $header-size: 36px

  div
    width: 40%
    padding: 5em
    background-color: $primary

  h2
    font-size: $header-size

</style>