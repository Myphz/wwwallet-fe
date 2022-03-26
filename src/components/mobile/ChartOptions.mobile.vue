<template>
  <header class="noselect">
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
    padding: 1em 0
    border-radius: 1.5em 1.5em 0 0
    display: flex
    justify-content: space-between
    background: $bg-dark
    border-bottom: 1px solid $bg-paper
        
  img
    width: 36px
    height: 36px
    cursor: pointer

  .pair
    margin-right: 1.5em

  .padded
    margin: 0 2rem

</style>