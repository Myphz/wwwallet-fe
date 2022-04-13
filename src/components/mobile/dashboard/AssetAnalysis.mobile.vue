<template>
  <div class="main bg-dark nohover h4 transition">
    <div class="crypto align-center h2 pad-1">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </div>

    <div style="height: 6vh">
      <LineChart />
    </div>

    <div class="pad-1 t">
      <div class="space-between header">
        <span>Avg Buy Price</span>
        <span>Current Price</span>
      </div>
      <div class="space-between">
        <div>$50,233.78</div>
        <div>$70,221.43</div>
      </div>

      <div class="space-between header">
        <span>% Change</span>
        <span>Earnings</span>
      </div>
      <div class="space-between">
        <div>+20.32%</div>
        <div>+$30,231.42</div>
      </div>
    </div>

    <div class="align-center justify-center arrow-cell bg-primary" style="height: 5vh" @click="open = !open">
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </div>

    <div :class="'transactions-row ' + (open ? 'row-open' : '')">
      <TransactionsAnalysis />
    </div>
  </div>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import LineChart from "M#/charts/LineChart.mobile.vue";
import TransactionsAnalysis from "M#/dashboard/TransactionsAnalysis.mobile.vue";
import { ref } from "vue";

const open = ref(false);
</script>

<style lang="sass" scoped>
  .main
    margin-bottom: 2em
    border-radius: 1em

  .ticker
    font-size: nth($font-sizes, 2)
    font-weight: 200

  .pad-1
    padding: 1em

  .crypto
    border-bottom: 1px solid $text-secondary
    padding-bottom: .2em
    margin-bottom: .5em

  .arrow-cell
    border-radius: 0 0 1em 1em

  .header
    font-weight: bold
    color: $text-secondary

  .transactions-row
    display: none

  .row-open
    display: block

  img
    width: 32px
    height: 32px
    margin-right: .5em
      
</style>