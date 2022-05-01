<template>
  <Transition name="fade" :onAfterEnter="() => $emit('endAnimation')">
    <div v-show="success !== null" :class="'response h4 align-center ' + (mobile ? 'response-mobile ' : 'response-desktop ') + (success ? 'success' : 'error')">
      <Icon :icon="success ? 'check' : 'warning'" />
      <div v-if="success">
        <div><strong>SUCCESS</strong></div>
        <div>{{ message }}!</div>
      </div>
      <div v-else>
        <div><strong>ERROR</strong></div>
        <div>{{ message + (message.includes("Please") ? "" : ". Please retry.") }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Icon from "U#/Icon.vue";

defineProps({
  success: {
    // Accept Booleans & null
    validator: prop => typeof prop === "boolean" || prop === null,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  mobile: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="sass" scoped>
  .response
    position: fixed
    border-radius: .5em
    opacity: 0
    z-index: 9999999999999
    text-align: left

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