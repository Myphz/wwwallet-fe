<template>
  <div class="trans h5">
    <div class="h3">
      Transaction #2
    </div>
    <div>BTC/USDT</div>

    <div class="space-between header">
      <span>Side</span>
      <span>Quantity</span>
    </div>
    <div class="space-between">
      <span>BUY</span>
      <span>2.42</span>
    </div>

    <div class="space-between">
      <span class="header">Price</span>
      <span class="header">Avg Price</span>
    </div>
    <div class="space-between">
      <span>$50,982.32</span>
      <span>$55,231.17</span>
    </div>

    <div class="space-between header">
      <span>Earnings</span>
      <span>% Change</span>
    </div>
    <div class="space-between">
      <span>+$9,008.22</span>
      <span>+42.22%</span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .trans
    background-color: lighten($bg-dark, 2%)
    margin-bottom: 1em
    border-radius: 1em
    padding: 1em

  .header
    font-weight: bold
    color: $text-secondary 
</style>