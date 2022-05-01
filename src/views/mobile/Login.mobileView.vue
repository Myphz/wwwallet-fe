<template>
  <section class="justify-center bg-section">
    <div>
      <InputBox login :redirect="$route.params.redirect" />
      <h2>Managing your crypto</h2>
      <h3>has never been <span>this easy</span></h3>
      <h1>Join now</h1>
    </div>
  </section>
</template>

<script setup>
import InputBox from "M#/login/InputBox.vue";
</script>

<style lang="sass" scoped>
  .bg-section
    position: fixed
    left: 0
    margin-top: -1.5em
    width: 100%
    height: calc(100% - 109px)
    background-image: linear-gradient(135deg, $bg-base 0%, rgba(0,6,13,1) 100%)

    & > div
      padding: 1em 2em
      text-align: center

  h2, h3
    font-weight: normal

  h3
    margin-bottom: 1em

  span
    color: darken($text-primary, 15%)
    font-weight: bold

</style>