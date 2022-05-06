<template>
  <section class="h4">
    <h1>Preferences</h1>

    <div>
      <div class="align-center">
        <Icon icon="coins" class="margin-right" />
        <span>Base Currency</span>
      </div>
      <Select 
        :options="Object.keys(QUOTES)" 
        iconSize="small" 
        mobile 
        @update:modelValue="updateCurrency" 
        :startValue="startValue || 'USD'" 
      />
    </div>

  </section>

  <section class="h4">
    <h1>Security</h1>

    <div class="bg-base transition pointer" @click="emailDialog = true">
      <div class="align-center">
        <Icon icon="email" class="margin-right" />
        <span>Email</span>
      </div>
      <Icon icon="arrow" class="margin-left" />
    </div>

    <div class="bg-base transition pointer" @click="passwordDialog = true">
      <div class="align-center">
        <Icon icon="password" class="margin-right" />
        <span>Password</span>
      </div>
      <Icon icon="arrow" class="margin-left" />
    </div>

  </section>

  <section class="h4">
    <h1>Advanced</h1>

    <div class="bg-base transition pointer">
      <div class="align-center">
        <CrossIcon class="margin-right red-stroke" style="transform: scale(.666)" />
        <span class="red">Delete all transactions</span>
      </div>
      <Icon icon="arrow" />
    </div>

    <div class="bg-base transition pointer">
      <div class="align-center">
        <CrossIcon class="margin-right red-stroke" style="transform: scale(.666)" />
        <span class="red">Delete account</span>
      </div>
      <Icon icon="arrow" />
    </div>
  </section>

  <Dialog v-if="emailDialog">
    <div class="space-between align-center" style="margin-bottom: 1em">
      <h2 style="white-space: nowrap; margin-right: 1em">Change email</h2>
      <Icon icon="cross" clickable @click="emailDialog = false" />
    </div>
    <span class="h4">Type your new email to update your account</span>
    <form @submit.prevent="changeEmail" style="margin-top: 3em">
      <Input 
        icon="email" 
        label="Email" 
        autocomplete="email" 
        :validate="validateEmail" 
        errorMessage="Invalid email" 
        v-model:value="values.email" 
        v-model:isValid="values.emailValid" 
      />
      <Button style="margin-top: 2em" submit>Submit</Button>
    </form>
  </Dialog>

  <Dialog v-if="passwordDialog">
    <div class="space-between align-center" style="margin-bottom: 1em">
      <h2 style="white-space: nowrap; margin-right: 1em">Change password</h2>
      <Icon icon="cross" clickable @click="passwordDialog = false" />
    </div>
    <span class="h4">Click the button to receive an email to change your current password</span><br>
    <Button btnCss="margin-top: 1em" @click="changePassword">Submit</Button>
  </Dialog>

  <Popup :success="popup.success" :message="popup.msg" @endAnimation="popup.success = null" mobile />
    
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

import { validateEmail } from "@/helpers/validator.helper";
import { fetchServer } from "@/helpers/fetch.helper";

const CrossIcon = defineAsyncComponent(() => import("../../assets/icons/cross.svg"));

const startValue = localStorage.getItem("currency");

const updateCurrency = newCurrency => {
  localStorage.setItem("currency", newCurrency);
  localStorage.setItem("currencySymbol", QUOTES[newCurrency].symbol);
};

// User update/delete
const emailDialog = ref(false);
const passwordDialog = ref(false);

const values = ref({});
const popup = ref({ success: null, msg: "" });

const changeEmail = async () => {
  if (!values.value.emailValid) return;
  popup.value = await fetchServer("account/update", { email: values.value.email });
  emailDialog.value = false;
};

const changePassword = async () => {
  popup.value = await fetchServer("account/update", null, { method: "POST" });
  passwordDialog.value = false;
};
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
      padding: .25em 0
      margin-bottom: .5em
      border-radius: .2em
      border-bottom: 1px solid $primary

  img
    width: 32px
    height: 32px

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