<template>
  <div>
    <ChartOptions :crypto="crypto" :base="base" v-model="base" />
  </div>
</template>

<script setup>
import ChartOptions from "./ChartOptions.vue";
import { onMounted, ref } from "vue";

const borderColor = "#001d3d";
const textColor = "#003A7B";

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

onMounted(() => {
  fetch("https://api.binance.com/api/v3/klines?symbol=ETHEUR&interval=5m")
    .then(res => res.json())
    .then(data => {
      data = data.slice(-100, -1);
      data = data.map(candle => candle.slice(0, 5).map(c => parseFloat(c)));

      const series = {
        name: "Series",
        data,
      };
  });
});
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_variables.sass" as *

  div
    height: 70vh

</style>