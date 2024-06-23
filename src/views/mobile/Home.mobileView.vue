<template>
  <div class="inter main-wrapper">
    <section>
      <img src="/images/bg.png" class="bg" alt="Background Effectg" />

      <nav>
        <Logo small />
        <a href="/dashboard">Get Started</a>
      </nav>

      <header class="hero">
        <div class="hero-text color-secondary">
          <span class="fade-up">Managing your crypto</span>
          <span class="fade-up" style="--delay: 0.1s">
            has never been
            <span class="color-text-highlight">so easy</span>
          </span>
        </div>

        <h1
          class="color-text-highlight poppins fade-up text-center"
          style="--delay: 0.2s"
        >
          Keep track of your crypto wallet in real-time, everywhere. Completely
          free and open source.
        </h1>

        <div class="hero-buttons fade-up" style="--delay: 0.3s">
          <a
            class="button-tertiary"
            href="https://play.google.com/store/apps/details?id=com.wwwallet.app"
            target="_blank"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_64_24)">
                <path
                  d="M3.83331 3.09167V16.9083C3.83335 17.0107 3.86032 17.1113 3.91153 17.1999C3.96274 17.2886 4.03639 17.3622 4.12506 17.4134C4.21373 17.4646 4.31431 17.4915 4.41669 17.4915C4.51907 17.4915 4.61965 17.4645 4.70831 17.4133L16.8933 10.3967C16.9631 10.3565 17.021 10.2986 17.0613 10.2289C17.1015 10.1592 17.1227 10.0801 17.1227 9.99958C17.1227 9.91908 17.1015 9.83999 17.0613 9.77028C17.021 9.70057 16.9631 9.64271 16.8933 9.6025L4.70831 2.58667C4.61959 2.53544 4.51894 2.50849 4.41648 2.50851C4.31403 2.50854 4.21339 2.53555 4.1247 2.58683C4.036 2.6381 3.96237 2.71184 3.91122 2.8006C3.86007 2.88937 3.8332 2.98921 3.83331 3.09167Z"
                  stroke="#E3ECF7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 7.5L4.25 17.0833"
                  stroke="#E3ECF7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.25 2.91666L13 12.5"
                  stroke="#E3ECF7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_64_24">
                  <rect
                    width="20"
                    height="20"
                    fill="none"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <span>Get it on Google Play</span>
          </a>
          <a href="/dashboard">Get Started</a>
        </div>
      </header>

      <div class="dashboard-wrapper margined fade" style="--delay: 0.7s">
        <img
          src="/images/mobile-dashboard.webp"
          class="dashboard"
          alt="dashboard"
        />
      </div>
    </section>

    <section class="second-section margined">
      <div class="first">
        <header>
          <span class="color-secondary" style="white-space: nowrap">
            How does it
          </span>
          <span class="color-text-highlight">work?</span>
        </header>

        <ul>
          <li>
            <div>
              <div class="color-text-highlight inter">Create an account</div>
              <div class="color-secondary">
                Register now to keep track of your wallet easily
              </div>
            </div>
          </li>
          <li>
            <div>
              <div class="color-text-highlight inter">
                Record your transactions
              </div>
              <div class="color-secondary">
                Enter your transaction details about your crypto movements
              </div>
            </div>
          </li>
          <li>
            <div>
              <div class="color-text-highlight inter">Check your dashboard</div>
              <div class="color-secondary">
                Enjoy real-time updates on more than 500 crypto, every second
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <div class="margined">
      <img src="/images/combined.webp" style="width: 100%" alt="mockup" />
    </div>

    <div class="cta inter color-secondary">
      <span>
        Start
        <span class="color-text-highlight">taking track</span>
        of
      </span>
      <span>your crypto now</span>

      <a
        class="color-text-highlight"
        href="/dashboard"
        style="
          font-weight: 400;
          margin-top: 32px;
          color: #e3ecf6;
          margin-bottom: 100px;
        "
      >
        Get Started
      </a>
    </div>
  </div>
</template>

<script setup>
import Logo from "U#/Logo.vue";
import Lenis from "lenis";

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
</script>

<style scoped>
a:not(.unstyled) {
  border-radius: 32px;
  padding: 0.5rem 1rem;
  font: inherit;
  color: inherit;
  background-color: #0070f4;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

svg path {
  fill: none;
}

.margined {
  margin: 0 18px;
}

.color-text-highlight {
  color: #e3ecf6;
}

.color-secondary {
  color: #85abd9;
}

.button-secondary {
  background-color: #303d64 !important;
  border: 1px solid #85abd9 !important;
}

.button-tertiary {
  border: 1px solid #0070f4 !important;
  background-color: #051629 !important;
  color: #e3ecf6 !important;
  display: flex;
  align-items: center;
  gap: 4px;
}

* {
  box-sizing: border-box;
}

.main-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: #e3ecf6;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.inter {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.poppins {
  font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}

.bg {
  position: absolute;
  opacity: 0.5;
  width: 100vw;
  pointer-events: none;
}

nav {
  width: 100%;
  padding: 0 18px;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  display: flex;
  align-items: center;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 64px;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
  font-size: 32px;
  font-weight: 700;
}

h1,
h2 {
  font: inherit;
}

h1 {
  display: flex;
  text-align: center;
  justify-content: center;
}

.hero-buttons {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-wrapper {
  position: relative;
  border-radius: 24px;
  box-shadow: 0px 4px 4px 0px #00000040;

  img {
    width: 100%;
    border-radius: inherit;
  }

  &::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: -2px;
    width: calc(100%+1px);
    height: 99.9%;
    border-radius: inherit;
    background-image: linear-gradient(
      180deg,
      #0070f4 13.64%,
      rgba(144, 194, 255, 0) 86.34%
    );
  }
}

.second-section {
  display: flex;
  gap: 128px;

  & > * {
    flex: 1;
  }

  .first {
    display: flex;
    flex-direction: column;

    ul {
      display: flex;
      flex-direction: column;
      gap: 32px;
      align-self: flex-start;

      li {
        align-self: flex-start;

        & > div {
          align-self: flex-start;

          div:first-of-type {
            font-size: 20px;
            font-weight: 700;
          }
        }
      }
    }
  }

  header {
    display: flex;
    gap: 0.25em;
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 28px;
  }
}

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  font-size: 32px;
}

.fade-up {
  opacity: 0;
  filter: blur(10px);
  translate: 0 50%;
  animation: faded-up 0.35s cubic-bezier(0.57, 0.21, 0.69, 1.25)
    var(--delay, 0s) forwards;
}

@keyframes faded-up {
  from {
    opacity: 0;
    filter: blur(10px);
    translate: 0 50%;
  }

  to {
    opacity: 1;
    translate: 0 0;
    filter: blur(0px);
  }
}

.fade {
  opacity: 0;
  filter: blur(10px);
  animation: faded 0.25s cubic-bezier(0.57, 0.21, 0.69, 1.25) var(--delay, 0s)
    forwards;
}

@keyframes faded {
  from {
    opacity: 0;
    filter: blur(10px);
  }

  to {
    opacity: 1;
    filter: blur(0px);
  }
}
</style>

<style>
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}
</style>
