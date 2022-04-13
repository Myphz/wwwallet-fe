<template>
  <header class="noselect space-between">
    <span class="align-center">
      <Select 
        class="pair padded text-primary h2" 
        :options="['BTC', 'LUNA']" 
      />

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
    width: 48px
    height: 48px
    cursor: pointer

  .pair
    margin-right: 2em

  .padded
    margin: 0 4rem

</style>