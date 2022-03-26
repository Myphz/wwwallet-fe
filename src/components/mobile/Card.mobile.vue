<template>
  <RouterLink custom v-slot="{ navigate }" to="/crypto/btc">
    <tr @click="navigate" class="h4 transition">
      <td class="align-center">
        <Icon icon="bitcoin" class="icon" />
        <span>
          <span class="title">Bitcoin</span> <span class="ticker">BTC</span>
        </span>
      </td>

      <td class="price">
        $51123.23
      </td>

      <td class="change">
        +20.34%
      </td>
    </tr>
  </RouterLink>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { RouterLink } from "vue-router";
</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  tr
    border-bottom: 1px solid $primary
    cursor: pointer
    &:hover
      background-color: lighten($bg-base, 5%)

  td
    padding: 0.7em 1em

  .icon
    margin-right: 1em

  .title
    font-weight: 600

  .ticker
    font-size: nth($font-sizes, 3) + 0.3rem
    font-weight: 200

  img
    width: 32px
    height: 32px
</style>