<template>
  <tr class="h4" @click="open = !open">
    <td class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>+20.32%</td>
    <td>+$30,231.42</td>
    <td>d</td>
    <td>s</td>
    <td>s</td>
    <td>s</td>
    <td>s</td>
    <td>
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </td>
  </tr>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import { ref } from "vue";
const open = ref(false);
</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px
    margin-right: 1em

  .title
    font-weight: 600
    margin-right: 1em

  td
    border-bottom: 1px solid $text-secondary

    &:last-child
      text-align: right
      
</style>