<template>
  <table :class="'nohover ' + bgColor">
    <thead>
      <tr>
        <th v-if="withTicker">Token</th>
        <th>Side</th>
        <th>Quantity</th>
        <th>Price</th>
        <th v-if="!withTicker"></th>
      </tr>
    </thead>
    <tbody>
      <Transaction v-for="i in 2" :key="i" :crypto="crypto" :withTicker="withTicker" :fontSize="fontSize" />
    </tbody>
  </table>
  <div v-if="withTicker" class="justify-center">
    <Button btnClass="h4 bg-dark bottom-rounded noborder" btnCss="margin-bottom: 2em" @click="$emit('open')">+ Add Transaction</Button>
  </div>
</template>

<script setup>
import Transaction from "@/components/mobile/Transaction.mobile.vue";
import Button from "@/components/Button.vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  fontSize: {
    type: String,
    default: "h4"
  },

  bgColor: {
    type: String,
    default: "bg-dark"
  },

  withTicker: {
    type: Boolean,
    default: true
  }
});

defineEmits(["open"]);
</script>

<style lang="sass" scoped>
  table
    border-radius: 1.5em

  th
    padding: 1em .5em
    text-align: left
    font-weight: bold

</style>