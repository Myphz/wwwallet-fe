<template>
  <table>
    <thead class="text-secondary">
      <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Price</th>
        <th>24h Change</th>
        <th>Market cap</th>
      </tr>
    </thead>
    <tbody>
      <Card v-for="i in 10" :key="i" crypto="BTC" />
    </tbody>
  </table>
  <section class="justify-center" style="gap: 5em; margin-top: 1em">
    <ArrowIcon :class="'arrow-icon noselect reverse ' + (page === 1 ? 'inactive' : 'bg-base transition pointer')" @click="page !== 1 ? page-- : null"/>
    <ArrowIcon class="arrow-icon noselect bg-base transition pointer" @click="page++" />
  </section>
</template>

<script setup>
import Card from "D#/markets/Card.vue"
import { defineAsyncComponent, ref } from "vue";
const ArrowIcon = defineAsyncComponent(() => import("../../../assets/icons/arrow.svg"));
const page = ref(1);
</script>

<style lang="sass">
  .arrow-icon
    width: 64px
    height: 64px  
    path
      fill: none

  .reverse
    transform: scaleX(-1)

  .inactive
    path
      stroke: $text-secondary
</style>