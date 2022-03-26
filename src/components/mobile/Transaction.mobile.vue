<template>
  <tr class="h4">
    <td class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span>BTC</span>
    </td>
    <td>2.15</td>
    <td>$31982.23</td>
    <td>+$80982.34</td>
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
  @use "/src/assets/sass/_utilities.sass" as *

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