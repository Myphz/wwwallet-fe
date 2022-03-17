<template>
  <div>
    <InputBox />
  </div>
</template>

<script setup>
import { onBeforeMount, onUnmounted } from 'vue'
import InputBox from "@/components/InputBox.vue"
import { useRoute } from 'vue-router';

const route = useRoute();

onBeforeMount(() => {
  document.body.classList.add("bg");
});

onUnmounted(() => {
  if (route.path != "/login") document.body.classList.remove("bg");
});

</script>

<style lang="sass">
  .bg
    background-image: url("/src/assets/images/bg.png")
    background-repeat: no-repeat
    background-size: cover
    
</style>