<template>
  <div>
    <InputBox subtext="Don’t have an account? Sign up" login />
  </div>
</template>

<script setup>
import { onBeforeMount, onUnmounted } from 'vue'
import InputBox from "@/components/InputBox.vue"

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
    background-size: 100% cover
    background-repeat: no-repeat
</style>