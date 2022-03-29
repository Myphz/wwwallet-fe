<template>
  <tr class="h4">
    <td class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span>BTC</span>
    </td>
    <td>BUY</td>
    <td>2.15</td>
    <td>$50982.34</td>
  </tr>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  }
});
</script>

<style lang="sass" scoped>
  .title
    font-weight: 600
    margin-right: 1em

  td
    padding: 0.7em .5em

  img
    width: 36px
    height: 36px

  .icon
    margin-right: .5em
</style>