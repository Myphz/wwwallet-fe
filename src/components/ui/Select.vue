<template>
  <div :class="'noselect ' + (open ? 'opened ' : '') + (bordered ? 'bordered' : '')">
    <span class="align-center item-container" @click="open = !open; search = ''; input.update('')">
      <span class="align-center">
        <Icon v-if="icon" :icon="icon" :class="'icon-' + iconSize" />
        <span>{{ selected }}</span>
      </span>
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </span>
    <ul class="h3 text-secondary">
      <Input icon="search" placeholder="Search" v-model:value="search" ref="input" />
      <li v-for="option in opts" :key="option" @click="select(option)">{{ option }}</li>
    </ul>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, toRefs, watch } from "vue";
import Icon from "U#/Icon.vue";
import Input from "U#/Input.vue";
import { useCryptoStore } from "S#/crypto.store";
import byMcap from "@/helpers/sortByMcap.helper";

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

const store = useCryptoStore();
const { options } = toRefs(props);
const { emit } = getCurrentInstance();

const input = ref();
const open = ref(false);
const search = ref("");
const selected = ref(props.startValue || options.value[0]);

const filterOptions = opt => opt !== selected.value && opt.includes(search.value.toUpperCase());
const opts = ref(options.value.filter(filterOptions).sort(byMcap(store)));

watch([options, search], () => {
  selected.value = props.startValue || newOpts[0];
  opts.value = options.value.filter(filterOptions).sort(byMcap(store));
});

const select = option => {
  selected.value = option;
  opts.value = options.value.filter(filterOptions).sort(byMcap(store));
  emit("update:modelValue", selected.value);
  open.value = !open.value;
  search.value = "";
  input.value.update("");
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
    background-color: $bg-dark

  li
    text-align: left
    cursor: pointer
    padding: .25em
    &:first-child
      margin-top: 0.5em

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