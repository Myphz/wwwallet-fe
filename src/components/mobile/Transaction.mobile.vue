<template>
  <tr :class="fontSize">
    <td v-if="withTicker" class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span>BTC</span>
    </td>
    <td>BUY</td>
    <td>2.15</td>
    <td>$50982.34</td>
    <td v-if="!withTicker" class="right-align">
      <Button btnClass="bg-outline h4" btnCss="padding: 0.3em;">Details</Button>
    </td>
  </tr>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  fontSize: {
    type: String,
    default: "h4"
  },

  withTicker: {
    type: Boolean,
    default: true
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

  .right-align
    display: flex
    justify-content: flex-end

  .icon
    margin-right: .5em
</style>