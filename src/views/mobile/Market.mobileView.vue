<template>
  <section>
    <SearchBar v-model="search" />
    <Cards :search="search" />
  </section>
</template>

<script setup>
import SearchBar from "U#/SearchBar.vue";
import Cards from "M#/markets/Cards.mobile.vue";
import { ref } from "vue";

const search = ref("");
</script>
