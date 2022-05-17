<template>
  <TransactionAnalysis 
    v-for="(transaction, i) in transactions.slice().slice(page*3, (page+1)*3)"
    :key="transaction._id"
    :transaction="transaction"
    :transactions="transactions"
    :n="page*3+i+1"
    :crypto="crypto"
    :currentValue="currentValue"
  />
  <section class="justify-center" style="gap: 2em; padding: .5em 0; margin-top: -1em" v-if="transactions.length > 5">
    <Icon
      :class="'transactions-arrow-icon noselect reverse ' + (!page ? 'inactive' : 'transition pointer')" 
      @click="page ? page-- : null"
    />
    <Icon
      :class="'transactions-arrow-icon noselect ' + ((page+1) * 3 <= transactions.length ? 'transition pointer' : 'inactive')" 
      @click="(page+1) * 3 <= transactions.length ? page++ : null" 
    />
  </section>
</template>

<script setup>
import TransactionAnalysis from "M#/dashboard/TransactionAnalysis.mobile.vue";
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
    width: 30px
    height: 30px  
    path
      fill: none
    &:not(.inactive):active
      background-color: lighten($bg-dark, 20%)

  .reverse
    transform: scaleX(-1)

  .inactive
    path
      stroke: $text-secondary  
</style>