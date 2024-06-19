<template>
  <section class="inter">
    <img src="/images/bg.png" class="bg" />

    <nav>
      <Logo />

      <ul style="gap: 64px">
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/crypto">Markets</a>
        </li>
        <li>
          <a href="/wallet">Wallet</a>
        </li>
      </ul>

      <ul style="gap: 1rem">
        <li><a href="/login" class="as-button button-secondary">Login</a></li>
        <li><a href="/register" class="as-button">Register</a></li>
      </ul>
    </nav>

    <div class="hero">
      <div class="hero-text color-secondary">
        <span>Managing your crypto</span>
        <span>
          has never been
          <span class="color-text-highlight">so easy</span>
        </span>
      </div>

      <h1 class="color-text-highlight poppins">
        <span>Keep track of your crypto wallet in real-time, everywhere.</span>
        <span>Completely free and open source.</span>
      </h1>

      <div class="hero-buttons">
        <button class="button-secondary">Learn More</button>
        <button>Get Started</button>
      </div>
    </div>

    <div class="dashboard-wrapper">
      <img src="/images/dashboard.webp" class="dashboard" />
    </div>

    <div>wewewewe</div>
  </section>
</template>

<script setup>
import Logo from "U#/Logo.vue";
</script>

<style scoped>
button {
  border-radius: 32px;
  padding: 0.5rem 1rem;
  font: inherit;
  color: inherit;
  background-color: #0070f4;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.as-button {
  border-radius: 32px;
  padding: 0.5rem 1rem;
  font: inherit;
  color: inherit;
  background-color: #0070f4;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.color-text-highlight {
  color: #e3ecf6;
}

.color-secondary {
  color: #85abd9;
}

.button-secondary {
  background-color: #303d64;
  border: 1px solid #85abd9;
}

* {
  box-sizing: border-box;
}

section {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: #e3ecf6;
  font-size: 24px;
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
  padding: 0 16.66vw;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 112px;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 164px;
  font-size: 64px;
  font-weight: 700;
}

h1 {
  font: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-buttons {
  margin-top: 24px;
  display: flex;
  gap: 1rem;
}

.dashboard-wrapper {
  position: relative;
  margin: 0 300px;
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
</style>
