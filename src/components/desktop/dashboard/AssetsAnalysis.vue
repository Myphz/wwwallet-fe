<template>
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Change</th>
        <th>Revenue</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>

      </tr>
    </thead>
    <tbody>
      <AssetAnalysis v-for="i in 10" />
    </tbody>
  </table>
</template>

<script setup>
import AssetAnalysis from "D#/dashboard/AssetAnalysis.vue";

const { frequency } = defineProps({
  frequency: {
    type: String,
    required: true
  }
});
</script>

<style lang="sass" scoped>
  table
    border-collapse: separate
    border-spacing: 0 1em
</style>