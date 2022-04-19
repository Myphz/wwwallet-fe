<template>
  <div :class="'noselect ' + (open ? 'opened ' : '') + (bordered ? 'bordered' : '')" @click="open = !open">
    <span class="align-center item-container">
      <span class="align-center">
        <Icon v-if="icon" :icon="icon" :class="'icon-' + iconSize" />
        <span>{{ selected }}</span>
      </span>
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </span>
    <ul class="h3">
      <li v-for="option in opts" @click="select(option)">{{ option }}</li>
    </ul>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, toRefs, watch } from "vue";
import Icon from "U#/Icon.vue";

const props = defineProps({
  options: {
    type: Array,
    required: true
  },

  startValue: {
    type: String,
    default: ""
  },

  icon: {
    type: String,
    default: ""
  },

  iconSize: {
    type: String,
    default: "big"
  },

  bordered: {
    type: Boolean,
    default: false
  }
});

const { options } = toRefs(props);
const { emit } = getCurrentInstance();
const open = ref(false);
const selected = ref(props.startValue || options.value[0]);
const opts = ref(options.value.filter(opt => opt !== selected.value));

watch(options, newOpts => {
  selected.value = props.startValue || newOpts[0];
  opts.value = newOpts.filter(opt => opt !== selected.value);
});

const select = option => {
  selected.value = option;
  opts.value = options.value.filter(option => option !== selected.value);
  emit("update:modelValue", selected.value);
}

</script>

<style lang="sass" scoped>
  $anim-duration: 0.25s

  div
    position: relative
    text-align: right
    cursor: pointer
    padding: 0 1em 0 0

    &.opened
      ul
        transform: scaleY(1)
  
  .item-container
    justify-content: space-between

  .bordered
    border: 2px solid $text-primary
    border-radius: .5em

  ul
    position: absolute
    transform: scaleY(0)
    transform-origin: top
    border-radius: .3em
    border: 2px solid $bg-paper
    min-width: 100%
    max-height: 40vh
    overflow-y: scroll
    width: fit-content
    z-index: 999999999
    transition: $anim-duration ease
    color: $text-secondary
    background-color: $bg-dark

  li
    text-align: left
    cursor: pointer
    padding: .25em
    &:first-child
      margin-top: 0.1em

  .icon-big
    width: 64px
    height: 64px
    margin: 0 .5em
    padding: .2em 0

  .icon-small
    width: 48px
    height: 48px
    margin: 0 .1em

</style>