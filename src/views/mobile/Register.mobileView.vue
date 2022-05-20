<template>
  <section class="justify-center bg-section">
    <div>
      <InputBox />
      <h2>Managing your crypto</h2>
      <h3>has never been <span>this easy</span></h3>
      <h1>Join now</h1>
    </div>
  </section>
</template>

<script setup>
import InputBox from "M#/login/InputBox.mobile.vue";
</script>

<style lang="sass" scoped>
  .bg-section
    position: fixed
    left: 0
    margin-top: -1.5em
    width: 100%
    height: calc(100% - 109px)
    background-image: $gradient

    & > div
      padding: 1em 2em
      text-align: center

      span
        color: darken($text-primary, 15%)
        font-weight: bold

  h2, h3
    font-weight: normal

  h3
    margin-bottom: 1em

</style>