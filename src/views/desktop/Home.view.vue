<template>
  <section>
    <div class="container">
      <Navbar />
      <div class="alessio">
        <div class="content">
          <div>
            <h1>Managing your crypto<br>has never been <i><span>this easy.</span></i></h1>
            <h2>Keep track of your crypto wallet<br>in real-time, everywhere.</h2>
            <h2>Completely <span>free</span> and <span>open source</span>.</h2>
            <Button btnClass="h2 bg-primary noborder" btnCss="border-radius: .25em">GET STARTED</Button>
          </div>
          <div>
            <img src="/src/assets/images/tablet_mockup.png" alt="Dashboard" class="tablet-image">
            <img src="/src/assets/images/phone_mockup.png" alt="Dashboard" class="phone-image">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Navbar from "D#/Navbar.vue";
import Button from "U#/Button.vue";
</script>

<style lang="sass" scoped>
  section
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-image: $gradient

  h1
    font-size: nth($font-sizes, 1) + 1rem
    margin-bottom: .75em

  h2
    font-weight: normal
    margin-bottom: 1em

  .container
    margin: 0 8.33vw
    height: 100%
    display: flex
    flex-direction: column

  .alessio
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center

  .content
    display: flex
    position: relative

  span
    color: darken($text-primary, 15%)
    font-weight: bold

  .tablet-image
    height: 100%
    position: absolute
    right: 0

  .phone-image
    height: 70%
    position: absolute
    right: 0
    bottom: 0
    

</style>