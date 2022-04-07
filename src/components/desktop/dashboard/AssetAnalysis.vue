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
  $anim-duration: 0.25s
  $border-type: 1px solid $text-primary

  img
    width: 48px
    height: 48px
    margin-right: 1em

  .title
    font-weight: 600
    margin-right: 1em

  td
    border-top: $border-type
    border-bottom: $border-type

    &:first-child
      border-radius: 1em 0 0 1em
      border-left: $border-type

    &:last-child
      text-align: right
      border-radius: 0 1em 1em 0
      border-right: $border-type


  .arrow
    width: 16px
    height: 16px
    position: relative
    transition: $anim-duration ease

    &:before, &:after
      position: absolute
      content: ''
      width: 3px
      height: 10px
      border-bottom: 12px solid $text-primary
      background-color: transparent
      transition: $anim-duration ease

    &:before
      transform: rotate(-135deg)
    &:after
      transform: rotate(135deg)

  .open 
    transform: rotate(0)
    &:before
      transform: rotate(-45deg)
    &:after
      transform: rotate(45deg)
</style>