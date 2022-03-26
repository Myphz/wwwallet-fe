<template>
  <div>
    <div class="filter"></div>
    <div class="container">
      <header class="space-between">
        <h3>Add Transaction</h3>
        <Icon 
          icon="cross"
          @click="$emit('close')"
          clickable
        />
      </header>
      <div class="options transition justify-center h1">
        <span :class="'option ' + (isBuy ? 'active' : '')" @click="isBuy = true">BUY</span>
        <span :class="'option ' + (isBuy ? '' : 'active')" @click="isBuy = false">SELL</span>
      </div>
      <div class="space-between">
        <Select 
          :options='["BTC", "ETH"]' 
          icon="bitcoin" 
          class="h3"
          iconSize="small"
          style="width: 40%"
          bordered
        />
        <Select 
          :options='["BTC", "ETH"]' 
          icon="bitcoin" 
          class="h3"
          iconSize="small"
          style="width: 40%"
          bordered
        />
      </div>

      <div class="space-between row">
        <Input icon="coins" placeholder="Quantity" iconSmall type="number" />
        <Input icon="exchange" placeholder="USDT Price" iconSmall type="number" />
      </div>
      <div class="space-between row">
        <Input icon="date" placeholder="Date (Now)" iconSmall />
        <Input icon="notes" placeholder="Notes" iconSmall />
      </div>

      <Input icon="dollar" placeholder="Total Value (USDT)" placeholderClasses="h4" type="number" />
      <Button text="add" btnClass="h3 bg-primary rounded" btnCss="width: 100%; line-height: 1.75em; margin-top: 1em;" />
    </div>
  </div>
</template>

<script setup>
import Select from "@/components/Select.vue";
import Input from "@/components/Input.vue";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import { ref } from "vue";

const isBuy = ref(false);
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_utilities.sass" as *
  @use "/src/assets/sass/_variables.sass" as *

  .container
    position: absolute
    border: none
    left: 50%
    top: 50%
    padding: 2em
    transform: translate(-50%, -50%)
    background-color: $bg-paper
    width: 80vw
    border-radius: 1.5em
    // Gotta defeat echarts' tooltip's z-index
    z-index: 999999999

  .filter
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: black
    opacity: .5
  
  .options
    background-color: $bg-dark
    border-radius: 1.5em
    margin-bottom: 1em

  .option
    width: 50%
    text-align: center
    border-radius: .5em
    cursor: pointer

  .space-between
    display: flex
    justify-content: space-between
    margin-bottom: 2em
    gap: 2em

  .row
    *
      width: 48%

  .active
    background-color: $primary

  .margin-bottom
    margin-bottom: 1em

  img
    width: 36px
    height: 36px


</style>