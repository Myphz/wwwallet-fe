<template>
  <Transition name="fade" :onAfterEnter="() => $emit('endAnimation')">
    <div v-show="success !== null" :class="'response h4 align-center ' + (mobile ? 'response-mobile ' : 'response-desktop ') + (success ? 'success' : 'error')">
      <Icon :icon="success ? 'check' : 'warning'" />
      <div v-if="success">
        <div><strong>SUCCESS</strong></div>
        <div>Transaction successfully added!</div>
      </div>
      <div v-else>
        <div><strong>ERROR</strong></div>
        <div>{{ message }}. Please retry.</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import { toRefs } from "vue";

const props = defineProps({
  success: {
    // Accept Booleans & null
    validator: prop => typeof prop === "boolean" || prop === null,
    required: true
  },

  message: {
    // Accept Strings & undefined
    validator: prop => typeof prop === "string" || typeof prop === "undefined",
    required: true
  },

  mobile: {
    type: Boolean,
    default: false
  }
});

const { success, message } = toRefs(props);
</script>

<style lang="sass" scoped>
  .response
    position: fixed
    border-radius: .5em
    opacity: 0
    z-index: 9999999999999

  .response-desktop
    padding: 1em 2.6em
    bottom: 5%
    right: 10%

    img
      width: 48px
      height: 48px
      margin-right: .5em
  
  .response-mobile
    bottom: 10%
    left: 50%
    transform: translateX(-50%)
    padding: 1em
    width: fit-content
    max-width: 70%

    img
      width: 36px
      height: 36px
      margin-right: .5em

    div
      max-width: 100%
    
  .error
    background-color: transparentize($red, 0.5)

  .success
    background-color: transparentize($green, 0.5)

  @keyframes faded
    0%
      opacity: 0
    20%
      opacity: 1
    80%
      opacity: 1
    100%
      opacity: 0

  .fade-enter-active
    animation: faded 2s
</style>