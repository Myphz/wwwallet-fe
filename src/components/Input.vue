<template>
  <span class="box">
    <Icon :icon="icon" class="icon" />
    <input type="text" :placeholder="capitalized">
  </span>
</template>

<script setup>
import Icon from "./Icon.vue"

const props = defineProps({
  icon: String,
  placeholder: String
});

const { icon } = props;
const capitalized = icon[0].toUpperCase() + icon.substring(1);
</script>

<style lang="sass" scoped>
  @import "./src/assets/sass/_variable.sass"

  input
    border: none
    outline: none
    background: none
    margin-left: 5px
    color: $text-color
    font-size: 18px
    &::placeholder
      color: $text-color-secondary

  .box
    display: flex
    align-items: center
    border-bottom: 1.5px solid $text-color
    padding: 2px
    margin: 0
    margin-bottom: 30px
    
</style>