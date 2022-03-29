<template>
  <RouterLink custom v-slot="{ navigate }" to="/crypto/btc">
    <tr @click="navigate" class="h4 transition">
      <td class="align-center">
        <Icon icon="bitcoin" class="icon" />
        <span class="title">Bitcoin</span>
      </td>

      <td class="ticker">
        BTC
      </td>

      <td>
        $51123.23
      </td>

      <td>
        +20.34%
      </td>

      <td>
        $1670B
      </td>
    </tr>
  </RouterLink>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { RouterLink } from "vue-router";
</script>

<style lang="sass" scoped>
  tr
    border-bottom: 1px solid $primary
    cursor: pointer
    &:hover
      background-color: lighten($bg-base, 5%)
      
  .icon
    margin-right: 1em

  .title
    font-weight: 600
</style>