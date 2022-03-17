<template>
  <header class="noselect">
    <span class="align-center">
      <Select 
        class="pair text-primary h2" 
        :options="['BTC', 'LUNA']" 
      />

      <Select 
        class="pair text-primary h2" 
        :options="['USDT', 'UST', 'EUR']" 
        v-model="selectedBase"
        @update:modelValue="$emit('update:modelValue', selectedBase)"
      />

    </span>

    <Icon icon="settings" />
  </header>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import Select from "@/components/Select.vue";
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
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  header
    padding: .5em 3em
    border-radius: 1.5em
    background-color: $bg-paper
    display: flex
    justify-content: space-between
      
  img
    width: 48px
    height: 48px

  .pair
    margin-right: 2em
</style>