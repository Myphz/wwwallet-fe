<template>
  <table>
    <thead>
      <th>Pair</th>
      <th>Side</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Earnings</th>
      <th>% Change</th>
      <th>Date</th>
    </thead>
    <tbody>
      <TransactionAnalysis 
        v-for="transaction in transactions.slice().reverse().slice(page*10, (page+1)*10)"
        :key="transaction._id"
        :transaction="transaction"
        :transactions="transactions"
        :crypto="crypto"
        :currentValue="currentValue"
      />
    </tbody>
  </table>
  <section class="justify-center" style="gap: 5em; padding: .5em 0" v-if="transactions.length > 10">
    <Icon
      :class="'transactions-arrow-icon noselect reverse ' + (!page ? 'inactive' : 'transition pointer')" 
      @click="page ? page-- : null"
    />
    <Icon
      :class="'transactions-arrow-icon noselect ' + ((page+1) * 10 <= transactions.length ? 'transition pointer' : 'inactive')" 
      @click="(page+1) * 10 <= transactions.length ? page++ : null" 
    />
  </section>
</template>

<script setup>
import TransactionAnalysis from "D#/dashboard/TransactionAnalysis.vue";
import Big from "@/helpers/big.helper.js";
import { defineAsyncComponent, ref } from "vue";

const Icon = defineAsyncComponent(() => import("../../../assets/icons/arrow.svg"));

defineProps({
  crypto: {
    type: String,
    required: true
  },

  currentValue: {
    type: Big,
    required: true
  },

  transactions: {
    type: Array,
    required: true
  }
});

const page = ref(0);
</script>

<style lang="sass">
  .transactions-arrow-icon
    width: 48px
    height: 48px  
    path
      fill: none
    &:not(.inactive):hover
      background-color: lighten($bg-dark, 10%)

  .reverse
    transform: scaleX(-1)

  .inactive
    path
      stroke: $text-secondary  
</style>