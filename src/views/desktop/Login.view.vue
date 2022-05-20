<template>
  <section class="noselect">
    <div class="align-center">
      <div>
        <Logo />
        
        <div class="text-header">
          <h1>Managing your crypto</h1>
          <h2>has never been <span><i>this easy</i></span></h2>
        </div>

        <div class="img-section" style="text-align: justify;">
          <img src="/images/phone_mockup.png" alt="phone_mockup">
          <h3 class="img-text">
            <div>Track your<br><span>crypto wallet</span><br>everywhere.</div>
            <div>Receive<br><span>real time updates</span><br>with many useful statistics.</div>
            <div>Completely<br><span>free</span> and <span>open source</span>.</div>
          </h3>
        </div>

      </div>
    </div>

    <div class="align-center justify-center">
      <InputBox login :redirect="$route.params.redirect" />
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
    justify-content: space-around
    background-image: $gradient

  .text-header, .img-section
    span
      color: darken($text-primary, 15%)
      font-weight: bold

  .text-header
    margin-top: 2.5em

  .img-section
    margin-top: 5em
    display: flex
    align-items: center
    gap: 5em

  .img-text
    display: flex
    height: 50vh
    flex-direction: column
    justify-content: space-around

  img
    height: 50vh
    width: auto

  h1, h2, h3
    font-weight: normal

</style>