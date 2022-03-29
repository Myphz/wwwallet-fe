<template>
  <tr :class="'h4 transition'">
    <td class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>BUY</td>
    <td>2.15</td>
    <td>$31982.23</td>
    <td>$80982.34</td>
    <td>20/12/2021 15:03</td>
  </tr>
</template>
<script setup>
import Icon from "@/components/Icon.vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true,
  }
});
</script>

<style lang="sass" scoped>
  .title
    font-weight: 600
    margin-right: 1em

  td
    padding: 0.7em 1em

  img
    width: 48px
    height: 48px

  .icon
    margin-right: 1em
</style>