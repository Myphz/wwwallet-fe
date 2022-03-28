<template>
  <div>
    <div class="filter"></div>
    <div class="container-popup">
      <header class="space-between">
        <h1>Add Transaction</h1>
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
          class="h2"
          bordered
        />
        <Select 
          :options='["BTC", "ETH"]' 
          icon="bitcoin" 
          class="h2"
          bordered
        />
      </div>

      <div class="space-between row">
        <Input icon="coins" placeholder="Quantity" type="number" />
        <Input icon="exchange" placeholder="Price in USDT" type="number" />
      </div>
      <div class="space-between row">
        <Datepicker 
          v-model="date" 
          format="dd/MM/yyyy HH:mm" 
          :maxDate="currentDate" 
          autoApply 
          :closeOnAutoApply="false"
          menuClassName="dp-menu"
          :inputClassName="'dp-input ' + (datePicked ? 'date-picked' : 'date-default')"
          @open.once="datePicked = true"
          dark 
        />
        <Input icon="notes" placeholder="Notes" />
      </div>

      <Input icon="dollar" placeholder="Total Value (USDT)" inputClasses="h4" placeholderClasses="h4" type="number" />
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

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const isBuy = ref(false);
const currentDate = new Date();
const date = ref(currentDate);
const datePicked = ref(false);
</script>

<style lang="sass">
  @use "/src/assets/sass/_utilities.sass" as *
  @use "/src/assets/sass/_variables.sass" as *

  $text-secondary-hex: #6D8AAC

  .container-popup
    position: absolute
    border: none
    left: 50%
    top: 50%
    padding: 2em
    transform: translate(-50%, -50%)
    background-color: $bg-paper
    width: 40vw
    border-radius: 1.5em

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

  .row
    span, .dp__main
      width: 48%

  .active
    background-color: $primary

  .margin-bottom
    margin-bottom: 1em

  .dp__theme_dark
    --dp-background-color: $bg-paper
    --dp-text-color: $text-primary
    --dp-icon-color: $text-primary
    --dp-scroll-bar-background: #{darken($bg-dark, 3%)}
    --dp-scroll-bar-color: #{lighten($bg-dark, 15%)}

  .dp__overlay, .dp__calendar_wrap
    font-family: $font-base

  .dp-menu, .dp__overlay_row
    background-color: $bg-dark

  .dp__active_date
    background-color: $primary
    &:hover
      background-color: darken($primary, 5%) !important

  .dp__cell_inner, .dp__button, .dp__month_year_select, .dp__inner_nav, .dp__inc_dec_button, .dp__time_display, .dp__overlay_cell
    &:hover
      background-color: darken($bg-dark, 3%)

  .dp__button_bottom
    background-color: darken($bg-dark, 3%)

  .dp__select
    color: $green

  .dp__cancel
    color: $red

  .dp__input_icons
    height: 48px
    width: 48px
    padding: 0
    path
      fill: $text-secondary-hex
      
  .dp-input
    font-size: nth($font-sizes, 5)
    padding: 11px 0 11px 50px
    border: none
    border-bottom: 1px solid $text-primary
    border-radius: 0
    line-height: unset
    &:hover
      border-color: $text-primary

  .dp__clear_icon
    display: none

  .date-default
    color: $text-secondary

  .date-picked
    color: $text-primary
    & + .dp__input_icons
      path  
        fill: $text-primary

</style>