<template>
  <header class="noselect space-between">
    <span class="align-center">
      <Select 
        class="margin-left text-primary h2" 
        :options="['BTC', 'LUNA']" 
      />

      <Select 
        class="text-primary h2" 
        :options="['USDT', 'UST', 'EUR']" 
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
import { ref } from "vue";

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

const selectedBase = ref(base);
</script>

<style lang="sass" scoped>
  header
    padding: 1em 0
    border-bottom: 1px solid $bg-paper
        
  img
    width: 36px
    height: 36px
    cursor: pointer

  .margin-left
    margin-left: 1em

  .margin-right
    margin-right: 1em

</style>