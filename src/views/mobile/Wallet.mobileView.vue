<template>
  <section>
    <h1>Your Wallet</h1>
    <SearchBar />
    <Wallet />
  </section>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
import Wallet from "@/components/mobile/Wallet.mobile.vue";
</script>

<style lang="sass" scoped>
  h1
    font-weight: normal
    margin-bottom: .5em
</style>