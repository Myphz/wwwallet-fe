<template>
  <img :src="icon" :class="'noselect ' + (clickable ? 'clickable' : '')">
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },

    clickable: {
      type: Boolean,
      default: false
    }
  },

  setup ({ icon }) {
    const iconFile = `/src/assets/icons/${icon}.svg`;
    return { icon: iconFile };
  }
}
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *

  .clickable
    cursor: pointer
</style>