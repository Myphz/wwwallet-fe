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
            <div class="align-center buttons">
              <Button btnClass="h3 bg-primary noborder" btnCss="border-radius: .25em; margin-right: 1em"><RouterLink to="/dashboard">GET STARTED</RouterLink></Button>
              <a href='https://play.google.com/store/apps/details?id=com.wwwallet.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                <img alt='Get it on Google Play' src='/images/google-play-badge.png' />
              </a>
            </div>
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
              <h1>Keep up with crypto</h1>
              <Button btnClass="h3 bg-primary noborder" btnCss="border-radius: .25em; margin-top: -.5em">
                <RouterLink to="/register">REGISTER NOW</RouterLink>
              </Button>
            </div>
          </div>
          <div>
            <img src="/images/phone_mockup2.png" alt="Dashboard" class="tablet-image">
          </div>
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

const onScroll = ({ deltaY }) => {
  if (deltaY < 0)
    animateScrollTo(first.value, { speed: 700 });
  else
    animateScrollTo(second.value, { speed: 700 });
};

onBeforeMount(() => window.addEventListener("wheel", onScroll));
onBeforeUnmount(() => window.removeEventListener("wheel", onScroll));
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
    margin-bottom: .5em

  h2
    font-weight: normal
    margin-bottom: .5em

  .page
    margin: 0 10vw
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

  .buttons
    align-items: stretch
    *
      display: flex
      align-items: center

  // Second page
  li
    margin-bottom: 1.5em

  dt, li::marker
    font-weight: bold

  dd
    font-size: 1.5rem


</style>