<template>
  <img :src="icon">
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  },

  setup ({ icon }) {
    const iconFile = `/src/assets/icons/${icon}.svg`;
    return { icon: iconFile };
  }
}
</script>