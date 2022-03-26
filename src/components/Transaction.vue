<template>
  <tr>
    <td>a</td>
    <td>a</td>
    <td>a</td>
    <td>a</td>
    <td>a</td>
  </tr>
</template>

<script setup>
const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  }
});
</script>

<style lang="sass" scoped>
</style>