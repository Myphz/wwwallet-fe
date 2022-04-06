<template>
  <div>
    test component
  </div>
</template>

<script setup>
const { frequency } = defineProps({
  frequency: {
    type: String,
    required: true
  }
});
</script>

<style lang="sass" scoped>
</style>