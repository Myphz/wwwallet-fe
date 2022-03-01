<template>
  <div>
    Test Login View
  </div>
</template>

<script setup>
import { onBeforeMount, onUnmounted } from 'vue'

onBeforeMount(() => {
  document.body.classList.add("bg");
});

onUnmounted(() => {
  document.body.classList.remove("bg");
});

</script>

<style lang="sass">
  .bg
    background-image: url("/src/assets/images/bg.png")
    background-size: cover
    background-repeat: no-repeat
</style>