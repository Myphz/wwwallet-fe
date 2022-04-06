<template>
  <template v-if="link">
    <RouterLink custom v-slot="{ navigate }" :to="link">
      <button 
        :type="submit ? 'submit' : null" 
        :class="'noselect text-primary transition ' + btnClass" 
        :style="btnCss"
        @click="navigate"
      >
        <slot />
      </button>
    </RouterLink>
  </template>

  <template v-else>
    <button :type="submit ? 'submit' : null" :class="'noselect text-primary transition ' + btnClass" :style="btnCss"><slot /></button>
  </template>
</template>

<script>
export default {
  props: {
    submit: {
      type: Boolean,
      default: false
    },

    btnClass: {
      type: String,
      default: "h4 bg-primary rounded"
    },

    btnCss: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: ""
    },
  },
}
</script>

<style lang="sass" scoped>
  button
    outline: none
    padding: .5em 1em
    text-transform: uppercase
    font-weight: bold
    cursor: pointer

  .noborder
    border: none
    
  .rounded
    border-radius: .625em
    border: none

  .bottom-rounded
    border-radius: 0 0 .625em .625em

</style>