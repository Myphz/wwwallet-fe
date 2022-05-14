<template>
  <section class="main-section">

    <section class="page" ref="first" id="first">
      <Navbar noPadding />
      <div class="content-wrapper">
        <div class="content">
          <div>
            <h1>Managing your crypto<br>has never been <i><span>this easy</span></i></h1>
            <h2>Keep track of your crypto wallet<br>in real-time, everywhere</h2>
            <h2>Completely <span>free</span> and <span>open source</span></h2>
            <Button btnClass="h2 bg-primary noborder" btnCss="border-radius: .25em"><RouterLink to="/dashboard">GET STARTED</RouterLink></Button>
          </div>
          <div>
            <img src="/images/tablet_mockup.png" alt="Dashboard" class="tablet-image">
            <img src="/images/phone_mockup.png" alt="Dashboard" class="phone-image">
          </div>
        </div>
      </div>
    </section>

    <section class="page" ref="second" id="second">
      <div class="content-wrapper">
        <div class="content">
          <div>
            <h1>How does it work?</h1>
            <ol class="h3" style="margin-left: 1em">
              <li>
                <dl>
                  <dt>Create an account</dt>
                  <dd>Register now to keep track<br>of your wallet easily</dd>
                </dl>
              </li>

              <li>
                <dl>
                  <dt>Record your transactions</dt>
                  <dd>Enter your transaction details<br>about your crypto movements</dd>
                </dl>
              </li>

              <li>
                <dl>
                  <dt>Check your dashboard</dt>
                  <dd>Enjoy real-time updates on more<br>than 500 crypto, every second</dd>
                </dl>
              </li>
            </ol>
          </div>
          <div>
            <img src="/images/phone_mockup2.png" alt="Dashboard" class="tablet-image">
          </div>
        </div>
        <div>
          <h1>Keep up with crypto</h1>
          <Button btnClass="h2 bg-primary noborder" btnCss="border-radius: .25em; margin-top: -2em">
            <RouterLink to="/register">REGISTER NOW</RouterLink>
          </Button>
        </div>
      </div>
    </section>

  </section>
</template>

<script setup>
import Navbar from "D#/Navbar.vue";
import Button from "U#/Button.vue";
import animateScrollTo from "animated-scroll-to";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

const first = ref();
const second = ref();

let start = 0;
const onScroll = () => {
  if (window.scrollY < start)
    animateScrollTo(first.value);
  else
    animateScrollTo(second.value);

  start = window.scrollY;
};

onBeforeMount(() => window.addEventListener("scroll", onScroll));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style lang="sass" scoped>
  .main-section
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 200%
    background-image: $gradient

  h1
    font-size: nth($font-sizes, 1) + .15rem
    margin-bottom: .75em

  h2
    font-weight: normal
    margin-bottom: 1em

  .page
    margin: 0 16.66vw
    height: 50%
    display: flex
    flex-direction: column

  .content-wrapper
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

  // Second page
  li
    margin-bottom: 1.5em

  dt, li::marker
    font-weight: bold
  
  dd
    font-size: 1.5rem
    

</style>