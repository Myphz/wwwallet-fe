<template>
  <div>
    <InputBox login />
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
  @import "/src/assets/sass/_mixins.sass"

  .bg
    background-image: url("/src/assets/images/bg.png")
    background-size: cover
    background-repeat: no-repeat

    @include phone
      background-size: unset
</style>