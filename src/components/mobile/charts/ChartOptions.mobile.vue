<template>
  <header class="noselect space-between">
    <span class="align-center">
      <h2 class="margin-left margin-right">{{ crypto }}</h2>

      <Select 
        class="text-primary h2" 
        :options="baseOptions" 
        v-model="selectedBase"
        @update:modelValue="$emit('update:modelValue', selectedBase)"
      />

    </span>

    <Icon icon="settings" class="margin-right" />
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
    margin-left: 1em

  .margin-right
    margin-right: 1em

</style>