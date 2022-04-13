<template>
  <InputBox login />
</template>

<script setup>
import { onBeforeMount, onUnmounted } from "vue";
import InputBox from "D#/login/InputBox.vue";
import { useRoute } from "vue-router";

const route = useRoute();

onBeforeMount(() => {
  document.body.classList.add("bg");
});

onUnmounted(() => {
  if (route.path != "/register") document.body.classList.remove("bg");
});

</script>

<style lang="sass">
  .bg
    background-image: url("/src/assets/images/bg.png")
    background-size: cover
    background-repeat: no-repeat
    
</style>