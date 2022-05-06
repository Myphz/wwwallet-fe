<template>
  <section>
    <div class="filter" />
    <div class="dialog-container">
      <slot/>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="sass" scoped>
  .dialog-container
    position: absolute
    top: 40%
    left: 50%
    transform: translate(-50%, -50%)
    padding: 2em
    background-color: $bg-paper
    border-radius: 1.5em

  .filter
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: black
    opacity: .5
</style>