<template>
  <section>
    <header class="logo">
      <Logo small />
    </header>
    <div class="page">
      <div class="content-wrapper">
        <div style="margin-bottom: 5em">
          <h1>Managing<br>your crypto<br>has never been <i><span>this easy</span></i></h1>
          <h3>Keep track of your crypto wallet in real-time, everywhere</h3>
          <h3>Completely <span>free</span> and <span>open source</span></h3>
          <Button btnClass="h2 bg-primary noborder" btnCss="border-radius: .25em"><RouterLink to="/dashboard">GET STARTED</RouterLink></Button>
        </div>

        <img src="/images/phone_mockup.png" alt="Dashboard">
      </div>
    </div>

    <div class="page">
      <div class="content-wrapper">
        <h1>How does it work?</h1>
        <ol class="h3" style="margin-left: 1em">
          <li>
            <dl>
              <dt>Create an account</dt>
              <dd>Register now to keep track of your wallet easily</dd>
            </dl>
          </li>

          <li>
            <dl>
              <dt>Record your transactions</dt>
              <dd>Enter your transaction details about your crypto movements</dd>
            </dl>
          </li>

          <li>
            <dl>
              <dt>Check your dashboard</dt>
              <dd>Enjoy real-time updates on more than 500 crypto, every second</dd>
            </dl>
          </li>
        </ol>
        <img src="/images/phone_mockup2.png" alt="Dashboard">
        <div style="margin-top: 2em">
          <h1>Keep up with crypto</h1>
          <Button btnClass="h2 bg-primary noborder" btnCss="border-radius: .25em; margin-top: -2em">
            <RouterLink to="/register">REGISTER NOW</RouterLink>
          </Button>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import Button from "U#/Button.vue";
import Logo from "U#/Logo.vue";
</script>

<style lang="sass" scoped>
  section
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: fit-content 
    background-image: $gradient

  .logo
    padding: .5em 1.5em
    margin-bottom: 1em
    background-color: $bg-dark

  h1
    font-size: nth($font-sizes, 1) + 1rem
    line-height: 5rem
    margin-bottom: .75em

  h3
    font-weight: normal
    margin-bottom: 1em

  .page
    margin: 0 5vw
    display: flex
    flex-direction: column
    &:last-of-type
      padding-bottom: calc(60px + 4em)

  .content-wrapper
    margin-bottom: 3em

  span
    color: darken($text-primary, 15%)
    font-weight: bold

  .tablet-image
    height: 100%
    position: absolute
    right: 0

  img
    width: 100%

  // Second page
  li
    margin-bottom: 2em

  dt, li::marker
    font-weight: bold
  
  dd
    font-size: nth($font-sizes, 3)
    

</style>