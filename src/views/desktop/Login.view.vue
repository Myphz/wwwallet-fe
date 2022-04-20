<template>
  <section class="noselect">
    <div class="align-center">
      <div>
        <Logo />
        
        <div class="text-header">
          <h1>Managing your crypto</h1>
          <h2>has never been <span class="trans"><i>this easy.</i></span></h2>
        </div>

        <div class="img-section" style="text-align: justify;">
          <img src="/src/assets/images/phone_mockup.png" alt="phone_mockup">
          <h3 class="img-text">
            <div>Track your<br><span class="trans">crypto wallet</span><br>everywhere.</div>
            <div>Receive<br><span class="trans">real time updates</span><br>with many useful statistics.</div>
            <div>Completely<br><span class="trans">free</span> and <span class="trans">open source</span>.</div>
          </h3>
        </div>

      </div>
    </div>

    <div class="align-center justify-center">
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
    justify-content: space-around
    background-image: linear-gradient(135deg, rgba(0,28,61,1) 0%, rgba(0,6,13,1) 100%)

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

  .trans
    color: darken($text-primary, 15%)
    font-weight: bold

  img
    height: 50vh
    width: auto

  h1, h2, h3
    font-weight: normal

</style>