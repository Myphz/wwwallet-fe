<template>
  <div :class="open ? 'opened' : null" @click="open = !open">
    <span class="align-center">
      {{ selected }}<span class="arrow"></span>
    </span>
    <ul>
      <li v-for="option in opts" @click="select(option)">{{ option }}</li>
    </ul>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";

const { options } = defineProps({
  options: {
    type: Array,
    required: true
  }
});

const { emit } = getCurrentInstance();
const open = ref(false);
const selected = ref(options[0]);
const opts = ref(options.filter(opt => opt !== selected.value));

const select = option => {
  selected.value = option;
  opts.value = options.filter(option => option !== selected.value);
  emit("update:modelValue", selected.value);
}

</script>

<style lang="sass" scoped>
  @use "/src/assets/sass/_variables.sass" as *
  @use "/src/assets/sass/_utilities.sass" as *

  $bg-box: #0A2039
  $anim-duration: 0.25s

  div
    text-align: right
    cursor: pointer

    &.opened
      .arrow 
        transform: rotate(0)
        transform: translate(0, -6px)
        &:before
          transform: rotate(-45deg)
        &:after
          transform: rotate(45deg)

      ul
        background-color: $bg-box
        transform: scaleY(1)
      
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
  
  ul
    position: absolute
    transform: scaleY(0)
    transform-origin: top
    border-radius: .3em
    padding: .25em
    z-index: 2
    transition: $anim-duration ease
    color: $text-secondary

  li
    text-align: left
    cursor: pointer
    &:first-child
      margin-top: 0.1em

</style>