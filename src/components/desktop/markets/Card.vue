<template>
  <tr class="h4 transition">
    <td>
      <div class="align-center">
        <Icon icon="bitcoin" class="icon" />
        <span class="title">Bitcoin</span>
      </div>
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
      <div class="align-center space-between">
        <span>$1670B</span>
        <Button btnClass="bg-outline h4" link="/crypto/btc">
          <span class="align-center">
            <span>Chart</span>
            <Icon icon="arrow" class="arrow" />
          </span>
        </Button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Button from "U#/Button.vue";
</script>

<style lang="sass" scoped>
  tr
    border-bottom: 1px solid $primary
      
  .icon
    margin-right: 1em

  .title
    font-weight: 600
  
  .arrow
    display: inline-block
    margin-left: .5em
    width: 32px
    height: 32px

</style>