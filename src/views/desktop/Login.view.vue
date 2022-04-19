<template>
  <section class="noselect">
    <div class="side">
      <div style="margin: 10em">
        <Logo />
        <div class="text-header">
          <h1>Managing your crypto</h1>
          <h2>has never been <i>this easy.</i></h2>
        </div>
        <div class="img-section" style="text-align: justify;">
          <img src="/src/assets/images/phone_mockup.png" alt="phone_mockup">
          <h1>Join <br>the future<br><u><i>NOW</i></u></h1>
        </div>
      </div>
    </div>
    <div class="test align-center justify-center">
      <InputBox login />
    </div>
  </section>
</template>

<script setup>
import Logo from "U#/Logo.vue";
import InputBox from "D#/login/InputBox.vue";
</script>

<style lang="sass" scoped>
  section
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    display: flex

  .side, .test
    width: 50%
    height: 100%

  .side
    background-color: $bg-base

  .test
    background-color: darken($bg-base, 2%)

  .text-header
    margin-top: 2.5em
    white-space: nowrap

  .img-section
    display: flex
    align-items: center
    h1
      font-size: nth($font-sizes, 1) * 2

  img
    width: 50%
    height: auto

</style>