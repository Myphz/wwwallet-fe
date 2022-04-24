<template>
  <Transition name="fade" :onAfterEnter="() => $emit('endAnimation')">
    <div v-show="success !== null" :class="'response h4 align-center ' + (success ? 'success' : 'error')">
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
    validator: prop => ["string", "undefined"].includes(typeof prop),
    required: true
  }
});

const { success, message } = toRefs(props);
</script>

<style lang="sass" scoped>
  .response
    position: fixed
    bottom: 5%
    right: 10%
    padding: 1em 2.6em
    border-radius: .5em
    opacity: 0

    img
      width: 48px
      height: 48px
      margin-right: .5em

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