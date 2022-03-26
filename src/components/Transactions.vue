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
      <Transaction v-for="i in 10" :key="i" :crypto="crypto" />
    </tbody>
  </table>
</template>

<script setup>
import Transaction from "@/components/Transaction.vue";
const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  }
});
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *
  table
    width: 100%
    border-collapse: collapse

  th
    padding: 1em 1.5em
    text-align: left

</style>