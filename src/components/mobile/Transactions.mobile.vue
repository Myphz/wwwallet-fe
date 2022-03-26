<template>
  <div>
    <table>
      <thead class="text-secondary">
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Buy Price</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        <Transaction v-for="i in 2" :key="i" :crypto="crypto" />
      </tbody>
    </table>
    <div class="justify-center" style="margin-bottom: 2em">
      <Button text="+ Add Transaction" btnClass="h4 bg-dark bottom-rounded" />
    </div>
  </div>
</template>

<script setup>
import Transaction from "@/components/mobile/Transaction.mobile.vue";
import Button from "@/components/Button.vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  }
});
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *
  @use "/src/assets/sass/_variables.sass" as *

  table
    background-color: $bg-dark  
    border-radius: 1.5em
    width: 100%
    border-collapse: collapse

  th
    padding: 1em .5em
    text-align: left

</style>