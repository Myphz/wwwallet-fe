<template>
  <header class="noselect space-between">
    <span class="align-center">
      <Select 
        class="text-primary h2" 
        :options="cryptoList"
        :startValue="selectedCrypto"
        v-model="selectedCrypto"
        @update:modelValue="$emit('update:Crypto', selectedCrypto)"
        iconSize="small"
      />
      <Select 
        class="text-primary h2" 
        :options="baseOptions"
        :startValue="base"
        v-model="selectedBase"
        @update:modelValue="$emit('update:Base', selectedBase)"
        iconSize="small"
      />
    </span>
    <Icon icon="settings" />
  </header>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Select from "U#/Select.vue";
import { computed, ref, toRef } from "vue";
import { useCryptoStore } from "S#/crypto.store";

const props = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  },

  totals: {
    type: Object,
    default: null
  },

  dashboard: {
    type: Boolean,
    default: false
  }
});

const { crypto, base, dashboard } = props;
const totals = toRef(props, "totals");

const store = useCryptoStore();

const selectedCrypto = ref(crypto);
const selectedBase = ref(base);

let baseOptions, cryptoList;
if (!dashboard) {
  baseOptions = computed(() => store.tickerInfo[selectedCrypto.value]?.quotes || []);
  cryptoList = computed(() => Object.keys(store.tickerInfo));
} else {
  cryptoList = computed(() => ["TOTAL", ...Object.keys(totals.value)]);
  baseOptions = ["USDT", "USDC"];
}
</script>

<style lang="sass" scoped>
  h2
    font-weight: normal

  span
    margin: 0 2.5em

  header
    padding: 1em 0
    border-bottom: 1px solid $bg-paper
        
  img
    width: 48px
    height: 48px
    cursor: pointer
    margin-right: 4em

</style>