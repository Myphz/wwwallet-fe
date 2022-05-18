<template>
  <header class="noselect space-between align-center shadow">
    <span class="align-center">
      <Select 
        class="margin-left text-primary h3" 
        :options="cryptoList"
        :startValue="selectedCrypto"
        v-model="selectedCrypto"
        @update:modelValue="$emit('update:Crypto', selectedCrypto); !dashboard && $router.replace({ name: 'crypto', params: { crypto: selectedCrypto } })"
        iconSize="small"
        mobile
      />

      <Select 
        class="text-primary h3" 
        :options="baseOptions"
        :startValue="startBase"
        v-model="selectedBase"
        @update:modelValue="$emit('update:Base', selectedBase)"
        iconSize="small"
        mobile
      />

    </span>

    <!-- <Icon icon="settings" class="margin-right" /> -->
  </header>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Select from "U#/Select.vue";
import { computed, getCurrentInstance, ref, toRef, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";
import { getBaseLCM } from "@/helpers/crypto.helper";

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
const { emit } = getCurrentInstance();

const selectedCrypto = ref(crypto);
const selectedBase = ref(base);

let baseOptions, cryptoList;
if (!dashboard) {
  baseOptions = computed(() => store.tickerInfo[selectedCrypto.value]?.quotes || []);
  cryptoList = computed(() => Object.keys(store.tickerInfo));
} else {
  const keys = computed(() => Object.keys(totals.value).filter(key => !totals.value[key].totalQuantity.eq(0)));
  cryptoList = computed(() => ["TOTAL", ...keys.value]);
  baseOptions = computed(() => selectedCrypto.value === "TOTAL" ? 
    getBaseLCM(keys.value, store.tickerInfo) : 
    store.tickerInfo[selectedCrypto.value]?.quotes || []
  );
};

const startBase = ref(base);

// Check if the given starter base is allowed (if there are any options to check from)
// Check if the given starter base is allowed (if there are any options to check from)
(function setBase() {
  if (!baseOptions.value.length) {
    const unwatch = watch(baseOptions, () => {
      setBase();
      unwatch();
    });

    return;
  };

  if (baseOptions.value.includes(base)) return;
  // If it's not allowed, update it to be the first option
  emit('update:Base', baseOptions.value[0]);
  selectedBase.value = baseOptions.value[0];
  startBase.value = baseOptions.value[0];
})();

</script>

<style lang="sass" scoped>
  header
    padding: 1em 0
    border-bottom: 1px solid $bg-paper

  h2
    font-weight: normal
        
  img
    width: 36px
    height: 36px
    cursor: pointer

  .margin-left
    margin-left: .5em

  .margin-right
    margin-right: 1em

</style>