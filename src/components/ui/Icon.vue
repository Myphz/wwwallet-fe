<template>
  <img :src="`/src/assets/icons/${icon}.svg`" :class="'noselect ' + (clickable ? 'clickable' : '')" :alt="icon">
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },

  clickable: {
    type: Boolean,
    default: false
  }
});

const { icon } = toRefs(props);
</script>

<style lang="sass" scoped>
  .clickable
    cursor: pointer
</style>