<template>
  <span>
    <div :class="'box-container align-center bordered ' + (value ? 'border-primary ' : '') + containerClasses">
      <InputIcon :class="(value ? 'icon-fill ' : 'icon-empty ') + (iconSmall ? 'icon-05' : '')" />
      <span class="input-container">
        <input 
          :class="'text-primary ' + inputClasses"
          :type="type === 'password' ? show ? 'text' : type : type"
          :name="icon"
          v-model="value"
          @input="$emit('update:value', $event.target.value); validator();"
          spellcheck="false"
          autocapitalize="none"
          :autocomplete="autocomplete"
          :disabled="disabled"
          :placeholder="placeholder"
          @keydown.space="e => allowSpaces ? null : e.preventDefault()"
          :oninput="upperCase ? 'let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p)' : null"
        >
        <label :class="'text-secondary ' + labelClasses">{{ label }}</label>
      </span>
      <component
        :is="show ? EyeClose : EyeOpen" 
        v-if="type === 'password'" 
        :class="(value ? 'icon-fill ' : 'icon-empty ') + (iconSmall ? 'icon-05' : '')" 
        style="margin-left: auto; margin-right: 1em; transform: scale(1.1); cursor: pointer" 
        @click="show = !show"
      />
    </div>
    <div v-show="!isValid && value" class="error text-red h6">
      <span>{{ errorMessage }}</span>
    </div>
  </span>
</template>

<script setup>
import { defineAsyncComponent, getCurrentInstance, ref, toRefs, watch } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true
  },

  label: {
    type: String,
  },

  type: {
    type: String,
    default: "text"
  },

  placeholder: {
    type: String,
    default: " "
  },

  startValue: {
    type: [String, Number],
    default: ""
  },

  autocomplete: {
    type: String,
    default: "off"
  },

  validate: {
    type: Function,
    default: _ => true
  },

  disabled: {
    type: Boolean,
    default: false
  },

  errorMessage: {
    type: String,
    default: ""
  },

  iconSmall: {
    type: Boolean,
    default: false
  },

  containerClasses: {
    type: String,
    default: ""
  },

  inputClasses: {
    type: String,
    default: "h4"
  },

  labelClasses: {
    type: String,
    default: "h4"
  },

  allowSpaces: {
    type: Boolean,
    default: false
  },

  upperCase: {
    type: Boolean,
    default: false
  }
});

const { icon, validate } = props;
const { startValue } = toRefs(props);

// Lazy loading component to import it from a string
// Import the svg directly using vite-svg-loader to style the icon
const InputIcon = defineAsyncComponent(() => import(`../../assets/icons/${icon}.svg`));
const EyeOpen = defineAsyncComponent(() => import("../../assets/icons/eye-open.svg"));
const EyeClose = defineAsyncComponent(() => import("../../assets/icons/eye-close.svg"));

const value = ref(startValue.value);
const isValid = ref(true);
const show = ref(false);

const { emit } = getCurrentInstance();

const validator = () => {
  // If the field is empty, there's nothing to validate
  if (!value.value) {
    isValid.value = false;
    emit("update:isValid", isValid.value);
    return;
  }
  isValid.value = validate(value.value);
  emit("update:isValid", isValid.value);
}

const update = val => {
  value.value = val;
};

const reset = () => update("");

// When startValue updates, update the current value and emit
watch(startValue, () => {
  value.value = startValue.value;
  isValid.value = validate(value.value);

  emit("update:value", value.value);
  emit("update:isValid", isValid.value);
});

defineExpose({ update, reset, validator });
</script>

<style lang="sass" scoped>
  .box-container
    width: 100%
    border-bottom: 1px solid $text-secondary
    position: sticky
    top: 0
    z-index: 100

  .border-primary
    border-bottom: 1px solid $text-primary

  .input-container
    position: relative
    width: 70%
    max-width: 70%

  input::placeholder
    color: $text-secondary

  label
    position: absolute
    top: -.2em
    left: .375em
    transition: 0.2s ease all
    pointer-events: none

  .error
    display: flex

    span
      flex-grow: 1
      width: 0
</style>

<style lang="sass">
  .icon-empty
    path
      fill: $text-secondary

  .icon-fill
    path
      fill: $text-primary

  .icon-05
    transform: scale(.5)
</style>