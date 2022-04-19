<template>
  <div>
    <SearchBar v-model="search" />
    <Cards :search="search" />
  </div>
</template>

<script setup>
import SearchBar from "U#/SearchBar.vue";
import Cards from "D#/markets/Cards.vue";
import { ref } from "vue";

const search = ref("");
</script>
