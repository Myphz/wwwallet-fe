<template>
  <header class="noselect space-between">
    <span class="align-center">
      <h2 class="pair">{{ crypto }}</h2>
      <Select 
        class="pair text-primary h2" 
        :options="baseOptions"
        :startValue="selectedBase"
        v-model="selectedBase"
        @update:modelValue="$emit('update:modelValue', selectedBase)"
      />

    </span>
    <Icon icon="settings" />
  </header>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Select from "U#/Select.vue";
import { computed, getCurrentInstance, ref, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";

const { crypto, base } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  }
});

const store = useCryptoStore();
const baseOptions = computed(() => store.tickerInfo[crypto]?.quotes || []);

const selectedBase = ref(base);
const { emit } = getCurrentInstance();

watch(selectedBase, newBase => {
  emit("update:modelValue", newBase);
});
</script>

<style lang="sass" scoped>
  h2
    font-weight: normal

  span
    margin: 0 4rem

  header
    padding: 1em 0
    border-bottom: 1px solid $bg-paper
        
  img
    width: 48px
    height: 48px
    cursor: pointer
    margin-right: 4rem

  .pair
    margin-right: 1em

</style>