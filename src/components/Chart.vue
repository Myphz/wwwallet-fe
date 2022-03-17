<template>
  <div>
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
  </div>
</template>

<script setup>
import ChartOptions from "./ChartOptions.vue";
import { ref } from "vue";

const props = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  }
});

const { crypto } = props;
const base = ref(props.base);
</script>

<style lang="sass" scoped>
</style>