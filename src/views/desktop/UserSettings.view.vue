<template>
  <section class="h3">
    <h1>Preferences</h1>

    <div>
      <div class="align-center">
        <Icon icon="coins" class="margin-right" />
        <span>Base Currency</span>
      </div>
      <Select :options="['USD', 'EUR']"/>
    </div>

  </section>

  <section class="h3">
    <h1>Security</h1>

    <div class="bg-base transition pointer">
      <div class="align-center">
        <UserIcon class="margin-right" style="transform: scale(1.5)"/>
        <span>Username</span>
      </div>
      <Icon icon="arrow" class="margin-left" />
    </div>

    <div class="bg-base transition pointer">
      <div class="align-center">
        <Icon icon="password" class="margin-right" />
        <span>Password</span>
      </div>
      <Icon icon="arrow" class="margin-left" />
    </div>

  </section>

  <section class="h3">
    <h1>Advanced</h1>

    <div class="bg-base transition pointer">
      <div class="align-center">
        <CrossIcon class="margin-right red-stroke" />
        <span class="red">Delete all transactions</span>
      </div>
      <Icon icon="arrow" />
    </div>

    <div class="bg-base transition pointer">
      <div class="align-center">
        <CrossIcon class="margin-right red-stroke" />
        <span class="red">Delete account</span>
      </div>
      <Icon icon="arrow" />
    </div>
  </section>
    
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Select from "U#/Select.vue";
import { defineAsyncComponent } from "vue";
const UserIcon = defineAsyncComponent(() => import("../../assets/icons/user.svg"));
const CrossIcon = defineAsyncComponent(() => import("../../assets/icons/cross.svg"));
</script>

<style lang="sass" scoped>
  h1
    margin-bottom: .5em

  section
    margin-bottom: 2em

    &>div
      display: flex
      justify-content: space-between
      align-items: center
      padding: .5em 0
      margin-bottom: .5em
      border-radius: .2em
      border-bottom: 1px solid $primary

  img
    width: 48px
    height: 48px

  .margin-left
    margin-left: .5em

  .margin-right
    margin-right: .5em
</style>

<style lang="sass">
  .red-stroke
    path
      stroke: $red
</style>