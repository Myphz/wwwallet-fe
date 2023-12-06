<template>
  <div
    :class="
      'noselect ' + (open ? 'opened ' : '') + (bordered ? 'bordered' : '')
    "
  >
    <span
      class="align-center item-container"
      @click="
        open = !open;
        search = '';
        input.update('');
        !mobile && input.focus();
      "
    >
      <span class="align-center">
        <img
          v-if="withIcon"
          :src="getIcon(selected)"
          :alt="selected"
          onerror="this.src='/icons/generic.svg'"
          :class="'icon-' + iconSize + (mobile ? ' icon-mobile' : '')"
        />
        <span>{{ selected }}</span>
      </span>
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </span>
    <ul class="h3 text-secondary" @scroll="detectScrollEnd">
      <Input
        icon="search"
        placeholder="Search"
        v-model:value="search"
        ref="input"
        containerClasses="bg-dark nohover"
        upperCase
      />
      <li
        v-for="option in opts.slice(0, 20 * page)"
        :key="option"
        @click="select(option)"
        class="align-center"
      >
        <img
          v-if="withIcon"
          :src="getIcon(option)"
          :alt="option"
          onerror="this.src='/icons/generic.svg'"
          :class="'icon-small' + (mobile ? ' icon-mobile-li' : '')"
        />
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, toRefs, watch } from "vue";
import Input from "U#/Input.vue";
import { useCryptoStore } from "S#/crypto.store";
import { byMcap } from "@/helpers/sort.helper";
import { getIcon } from "@/helpers/crypto.helper";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },

  startValue: {
    type: String,
    default: "",
  },

  withIcon: {
    type: Boolean,
    default: true,
  },

  iconSize: {
    type: String,
    default: "big",
  },

  bordered: {
    type: Boolean,
    default: false,
  },

  mobile: {
    type: Boolean,
    default: false,
  },
});

const store = useCryptoStore();
const { options, startValue } = toRefs(props);
const { emit } = getCurrentInstance();

const input = ref();
const page = ref(1);
const open = ref(false);
const search = ref("");
const selected = ref(startValue.value || options.value[0]);

const filterOptions = (options) =>
  options
    .filter(
      (opt) =>
        opt !== selected.value && opt.includes(search.value.toUpperCase())
    )
    .sort(byMcap(store));
const opts = ref(filterOptions(options.value));

watch(startValue, () => {
  reset();
  emit("update:modelValue", selected.value);
  opts.value = filterOptions(options.value);
});

watch(options, () => {
  reset(selected.value);
  emit("update:modelValue", selected.value);
  opts.value = filterOptions(options.value);
});

watch(search, () => {
  opts.value = filterOptions(options.value);
});

const select = (option) => {
  selected.value = option;
  emit("update:modelValue", selected.value);
  opts.value = filterOptions(options.value);
  open.value = !open.value;
};

const detectScrollEnd = (event) => {
  // Detect scroll end
  if (
    event.target.scrollHeight - event.target.scrollTop - 10 >=
      event.target.clientHeight ||
    page.value * 20 > opts.length
  )
    return;
  page.value++;
};

const reset = (newValue) => {
  const updateValue = newValue || startValue.value;
  selected.value =
    updateValue && options.value.includes(updateValue)
      ? updateValue
      : options.value[0];
};

defineExpose({ reset });
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

img
  border-radius: 999rem
  background: white

.icon-big
  width: 64px
  height: 64px
  margin: 0 .5em
  padding: .2em 0

.icon-small
  width: 48px
  height: 48px
  margin: 0 .5em

.icon-mobile
  transform: scale(.7)
  margin: 0

.icon-mobile-li
  transform: scale(.6)
  margin: 0
</style>
