<template>
  <section class="h4">
    <h2>Preferences</h2>

    <div>
      <div class="align-center">
        <Icon icon="coins" class="margin-right" />
        <span>Base Currency</span>
      </div>
      <Select 
        :options="Object.keys(QUOTES)" 
        iconSize="small" 
        @update:modelValue="updateCurrency" 
        :startValue="startValue || 'USD'" 
      />
    </div>

  </section>

  <section class="h4">
    <h2>Security</h2>

    <div class="bg-base transition pointer">
      <div class="align-center">
        <Icon icon="email" class="margin-right" />
        <span>Email</span>
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

  <section class="h4">
    <h2>Advanced</h2>

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
import { QUOTES } from "@/config/config"

const CrossIcon = defineAsyncComponent(() => import("../../assets/icons/cross.svg"));

const startValue = localStorage.getItem("currency");

const updateCurrency = newCurrency => {
  localStorage.setItem("currency", newCurrency);
  localStorage.setItem("currencySymbol", QUOTES[newCurrency].symbol);
};
</script>

<style lang="sass" scoped>
  h2
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