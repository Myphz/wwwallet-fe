<template>
  <div>
    <div class="filter"></div>
    <div class="container-popup">
      <header class="space-between margin-bottom">
        <h2 v-if="isDetail">Transaction Detail</h2>
        <h2 v-else>Add Transaction</h2>
        <Icon 
          icon="cross"
          @click="$emit('close')"
          clickable
        />
      </header>
      <div class="options transition justify-center h1 noselect">
        <span :class="'option ' + (isBuy ? 'active' : '')" @click="isBuy = true">BUY</span>
        <span :class="'option ' + (isBuy ? '' : 'active')" @click="isBuy = false">SELL</span>
      </div>
      <div class="space-between">
        <Select 
          :options='["BTC", "ETH"]' 
          icon="bitcoin" 
          class="h3 width-50"
          iconSize="small"
          style="width: 40%"
          bordered
        />
        <Select 
          :options='["BTC", "ETH"]' 
          icon="bitcoin" 
          class="h3 width-50"
          iconSize="small"
          style="width: 40%"
          bordered
        />
      </div>

      <div class="space-between row">
        <Input icon="coins" placeholder="Quantity" iconSmall type="number" :startValue="quantity" v-model="quantity" />
        <Input icon="exchange" placeholder="BTC/USDT" iconSmall type="number" :startValue="price" v-model="price" />
      </div>
      <div class="space-between row">
        <Datepicker 
          v-model="date" 
          format="dd/MM HH:mm" 
          :maxDate="currentDate" 
          autoApply 
          :closeOnAutoApply="false"
          menuClassName="dp-menu"
          :inputClassName="'dp-input ' + (datePicked ? 'date-picked' : 'date-default')"
          @open.once="datePicked = true"
          dark 
        />
        <Input icon="notes" placeholder="Notes" iconSmall :startValue="notes" v-model="notes" />
      </div>

      <Input icon="dollar" placeholder="Total Value (USDT)" inputClasses="h4" placeholderClasses="h4" type="number" />
      <Button v-if="!isDetail" btnClass="h3 bg-primary rounded" btnCss="width: 100%; margin-top: 1em;">Add</Button>
      <div v-else class="space-between" style="margin-bottom: 0">
        <Button btnClass="h3 bg-primary rounded" btnCss="width: 100%; margin-top: 1em;">UPDATE</Button>
        <Button btnClass="h3 bg-base rounded" btnCss="width: 100%; margin-top: 1em;">DELETE</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Select from "U#/Select.vue";
import Input from "U#/Input.vue";
import Icon from "U#/Icon.vue";
import Button from "U#/Button.vue";
import { ref } from "vue";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  isBuy: {
    type: Boolean,
    default: true,
  },

  quantity: {
    type: [Number, String],
    default: "",
  },

  price: {
    type: [Number, String],
    default: "",
  },

  date: {
    type: Date,
    default: new Date(0)
  },

  notes: {
    type: String,
    default: ""
  }
});

// Convert each prop to ref
const { isBuy, quantity, price, date, notes } = Object.keys(props).reduce((obj, key) => ({...obj, [key]: ref(props[key])}), {});
const currentDate = new Date();
if (date.value.getTime() === 0) date.value = currentDate;
const datePicked = ref(date.value !== currentDate);
// Check if the component has been called with quantity valorized, i.e if this must be a Transaction Detail
const isDetail = !!quantity.value;
</script>

<style lang="sass">
  .container-popup
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

  .width-50
    width: 50%
  
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
    span, .dp__main
      width: 48%

  .active
    background-color: $primary

  .margin-bottom
    margin-bottom: 1em

  img
    width: 36px
    height: 36px

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

  .dp-menu
    min-width: unset

  .dp__active_date
    background-color: $primary
    &:hover
      background-color: darken($primary, 5%) !important

  .dp__cell_inner, .dp__button, .dp__month_year_select, .dp__inner_nav, .dp__inc_dec_button, .dp__time_display, .dp__overlay_cell
    &:hover
      background-color: darken($bg-dark, 3%)

  .dp__button_bottom
    background-color: lighten($bg-dark, 10%)
    padding: 0

  .dp__select
    color: $green

  .dp__cancel
    color: $red

  .dp__input_icons
    height: 24px
    width: 24px
    path
      fill: #6D8AAC

  .dp-input
    font-size: nth($font-sizes, 5)
    padding: 16px 0 16px 50px
    border: none
    border-bottom: 1px solid $text-primary
    border-radius: 0
    line-height: unset
    &:hover
      border-color: $text-primary

  .dp__menu_index
    z-index: 9999999999

  .dp__clear_icon
    display: none

  .date-default
    color: $text-secondary

  .date-picked
    color: $text-primary
    & + .dp__input_icons
      path  
        fill: $text-primary

  .dp__calendar_header_item, .dp__cell_inner
    height: 24px
    width: 24px

  .dp__instance_calendar
    overflow: hidden

  .dp__overlay
    overflow-x: hidden

</style>