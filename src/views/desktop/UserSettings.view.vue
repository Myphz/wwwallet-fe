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

    <div class="bg-base transition pointer" @click="openDialog = true">
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

  <Dialog v-if="openDialog">
    <div class="space-between">
      <h2>Change email</h2>
      <Icon icon="cross" clickable @click="openDialog = false" />
    </div>
    <span class="h4">Type your new email to update your account</span>
    <form @submit.prevent="changeEmail" style="margin-top: 3em">
      <Input 
        icon="email" 
        label="Email" 
        autocomplete="email" 
        :validate="validateEmail" 
        errorMessage="Invalid Email" 
        v-model:value="values.email" 
        v-model:isValid="values.isEmailValid" 
      />
      <Button style="margin-top: 2em" submit>Submit</Button>
    </form>
  </Dialog>

  <Popup :success="popup.success" :message="popup.msg" @endAnimation="popup.success = null" />
    
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Input from "U#/Input.vue";
import Select from "U#/Select.vue";
import Dialog from "U#/Dialog.vue";
import Popup from "U#/Popup.vue";
import Button from "U#/Button.vue";
import { defineAsyncComponent, ref } from "vue";
import { QUOTES } from "@/config/config"

import { validateEmail, validatePassword } from "@/helpers/validator.helper";
import { fetchServer } from "@/helpers/fetch.helper";

const CrossIcon = defineAsyncComponent(() => import("../../assets/icons/cross.svg"));

const startValue = localStorage.getItem("currency");

const updateCurrency = newCurrency => {
  localStorage.setItem("currency", newCurrency);
  localStorage.setItem("currencySymbol", QUOTES[newCurrency].symbol);
};

// User update/delete
const openDialog = ref(false);
const values = ref({});
const popup = ref({ success: null, msg: "" });

const changeEmail = async () => {
  if (!values.value.isEmailValid) return;
  popup.value = await fetchServer("account/update", { email: values.value.email });
  openDialog.value = false;
}
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