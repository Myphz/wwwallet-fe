<template>
  <img :src="`/icons/${icon}.svg`" :class="'noselect ' + (clickable ? 'clickable' : '')" :alt="icon">
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },

  clickable: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="sass" scoped>
  .clickable
    cursor: pointer
</style>