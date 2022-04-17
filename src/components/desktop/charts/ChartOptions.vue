<template>
  <header class="noselect space-between">
    <span class="align-center">
      <h2 class="pair">{{ crypto }}</h2>
      <Select 
        class="pair text-primary h2" 
        :options="['USDT', 'UST', 'EUR']" 
        v-model="selectedBase"
        @update:modelValue="$emit('update:modelValue', selectedBase)"
      />

    </span>
    <Icon icon="settings" class="padded" />
  </header>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Select from "U#/Select.vue";
import { getCurrentInstance, ref, toRefs, watch } from "vue";

const { base } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  }
});

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
    margin-left: 4rem

  header
    padding: 1em 0
    border-bottom: 1px solid $bg-paper
        
  img
    width: 48px
    height: 48px
    cursor: pointer

  .pair
    margin-right: 1em

</style>