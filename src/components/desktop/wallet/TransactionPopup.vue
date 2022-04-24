<template>
  <div>
    <div class="filter"></div>
    <div class="container-popup">
      <header class="space-between margin-bottom">
        <h1 v-if="isDetail">Transaction Detail</h1>
        <h1 v-else>Add Transaction</h1>
        <Icon 
          icon="cross"
          @click="$emit('close'); resetFields()"
          clickable
        />
      </header>
      <div class="options transition justify-center h1">
        <span :class="'option ' + (isBuy ? 'active' : '')" @click="isBuy = true">BUY</span>
        <span :class="'option ' + (isBuy ? '' : 'active')" @click="isBuy = false">SELL</span>
      </div>
      <div class="space-between margin-bottom gap">
        <Select 
          :options="cryptoList"
          icon="bitcoin"
          class="h2 width-50"
          :startValue="crypto"
          v-model="selectedCrypto"
          :ref="e => inputs[0] = e"
          bordered
        />
        <Select 
          :options="quotes"
          icon="bitcoin" 
          class="h2 width-50"
          :startValue="base"
          v-model="selectedBase"
          :ref="e => inputs[1] = e"
          bordered
        />
      </div>

      <div class="space-between row margin-bottom">
        <Input 
          icon="coins" 
          label="Quantity" 
          v-model:value="quantity"
          v-model:isValid="inputsValid[0]"
          :validate="isPositiveFloat"
          errorMessage="Invalid value"
          :ref="e => inputs[2] = e" 
        />

        <Input 
          icon="exchange" 
          :label="`${selectedCrypto}/${selectedBase}`" 
          :startValue="startPrice"
          v-model:value="price"
          v-model:isValid="inputsValid[1]"
          :validate="isPositiveFloat"
          errorMessage="Invalid value"
          :ref="e => inputs[3] = e"
        />
        
      </div>

      <div class="space-between row margin-bottom">
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
        <Input 
          icon="notes" 
          label="Notes" 
          :startValue="notes" 
          v-model:value="notes" 
          :ref="e => inputs[4] = e" 
        />
      </div>

      <Input icon="dollar" label="Total Value (USDT)" inputClasses="h4" labelClasses="h4" ref="totalInput" disabled />
      <Button v-if="!isDetail" btnClass="h3 bg-primary rounded" btnCss="width: 100%; margin-top: 1em;" @click="submitTransaction">Add</Button>
      <div v-else class="space-between gap">
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
import Big from "big.js";
import { computed, getCurrentInstance, reactive, ref, toRefs, watch } from "vue";
import { isPositiveFloat } from "@/helpers/validator.helper";
import { useCryptoStore } from "S#/crypto.store";
import { useAuthStore } from "S#/auth.store";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  crypto: {
    type: String,
    default: "BTC"
  },

  base: {
    type: String,
    default: "USDT"
  },

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

const cryptoStore = useCryptoStore();
const authStore = useAuthStore();

const { crypto, base } = toRefs(props);

const selectedCrypto = ref(crypto.value);
const selectedBase = ref(base.value);

const startPrice = ref("");

// Watch only once
const unwatch = watch(cryptoStore.prices, () => {
  startPrice.value = cryptoStore.prices[selectedCrypto.value + selectedBase.value]?.c?.toString() || "";
  unwatch();
});

const { emit } = getCurrentInstance();
// Convert each prop to ref
const { isBuy, quantity, price, date, notes } = Object.keys(props).reduce((obj, key) => ({...obj, [key]: ref(props[key])}), {});

const cryptoList = computed(() => Object.keys(cryptoStore.tickerInfo));
const quotes = computed(() => cryptoStore.tickerInfo[selectedCrypto.value]?.quotes || []);

const currentDate = new Date();
if (date.value.getTime() === 0) date.value = currentDate;
const datePicked = ref(date.value !== currentDate);

const inputs = reactive(new Array(5));
const inputsValid = reactive([false, false]);

const totalInput = ref();
// Check if the component has been called with quantity valorized, i.e if this must be a Transaction Detail
const isDetail = !!quantity.value;

const resetFields = () => {
  selectedCrypto.value = crypto.value;
  selectedBase.value = base.value;
  isBuy.value = true;
  price.value = cryptoStore.prices[selectedCrypto.value + selectedBase.value]?.c?.toString() || "";
  quantity.value = "";
  date.value = currentDate;
  datePicked.value = false;
  totalInput.value.update("");
  notes.value = "";
  // Check if the price field is not empty
  Object.assign(inputsValid, [false, !!price.value]);
  inputs.forEach(input => input.reset());
  // Don't reset the price input field
  inputs[3].update(price.value);
};

const submitTransaction = async () => {
  if (inputsValid.some(input => !input)) return;
  const params = { 
    crypto: selectedCrypto.value, 
    base: selectedBase.value,
    isBuy: isBuy.value,
    price: price.value,
    quantity: quantity.value,
    date: date.value.getTime(),
    notes: notes.value
  };

  const { success, msg } = await authStore.addTransaction(params);
  emit("success", success);
  emit("message", msg);
  if (success) {
    emit("close");
    resetFields();
  }
};

watch([quantity, price], () => {
  if (inputsValid.some(e => !e)) return totalInput.value.reset();
  const total = Big(quantity.value).times(price.value);
  totalInput.value.update(total.toFixed(2));
});

watch([selectedCrypto, selectedBase], () => {
  startPrice.value = cryptoStore.prices[selectedCrypto.value + selectedBase.value]?.c?.toString() || "";
});
</script>

<style lang="sass" scoped>
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

  .width-50
    width: 50%

  .option
    width: 50%
    text-align: center
    border-radius: .5em
    cursor: pointer

  .row
    span, .dp__main
      width: 48%

  .active
    background-color: $primary

  .margin-bottom
    margin-bottom: 2em

  .gap
    gap: 1em
</style>

<style lang="sass">
  $text-secondary-hex: #6D8AAC

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
    border-bottom: 1px solid $text-secondary
    border-radius: 0
    line-height: unset
    &:hover
      border-color: $text-secondary

  .dp__clear_icon
    display: none

  .date-default
    color: $text-secondary

  .date-picked
    color: $text-primary
    & + .dp__input_icons
      path  
        fill: $text-primary
        
    border-bottom: 1px solid $text-primary
    &:hover
      border-bottom: 1px solid $text-primary
</style>