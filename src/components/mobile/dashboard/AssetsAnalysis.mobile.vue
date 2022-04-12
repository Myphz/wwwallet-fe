<template>
  <AssetAnalysis v-for="i in 10" />
</template>

<script setup>
import AssetAnalysis from "M#/dashboard/AssetAnalysis.mobile.vue";

const { frequency } = defineProps({
  frequency: {
    type: String,
    required: true
  }
});
</script>