<template>
  <div>
    <table>
      <thead class="text-secondary">
        <tr>
          <th>Token</th>
          <th>Side</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <Transaction v-for="i in 2" :key="i" :crypto="crypto" />
      </tbody>
    </table>
    <div class="justify-center">
      <Button text="+ Add Transaction" btnClass="h4 bg-dark bottom-rounded" btnCss="margin-bottom: 2em" @click="$emit('open')" />
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
  table
    background-color: $bg-dark  
    border-radius: 1.5em
    width: 100%
    border-collapse: collapse

  th
    padding: 1em .5em
    text-align: left
    font-weight: bold

</style>