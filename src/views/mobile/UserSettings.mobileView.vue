<template>
  <section class="h4">
    <h1>Preferences</h1>

    <div>
      <div class="align-center">
        <Icon icon="dollar" class="margin-right" />
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

    <div class="bg-base transition pointer" @click="store.logout">
      <div class="align-center">
        <Icon icon="logout" class="margin-right" />
        <span>Logout</span>
      </div>
      <Icon icon="arrow" class="margin-left" />
    </div>

    <div class="bg-base transition pointer" @click="dialogMode = 'email'">
      <div class="align-center">
        <Icon icon="email" class="margin-right" />
        <span>Email</span>
      </div>
      <Icon icon="arrow" class="margin-left" />
    </div>

    <div class="bg-base transition pointer" @click="dialogMode = 'password'">
      <div class="align-center">
        <Icon icon="password" class="margin-right" />
        <span>Password</span>
      </div>
      <Icon icon="arrow" class="margin-left" />
    </div>

  </section>

  <section class="h4">
    <h1>Advanced</h1>

    <div class="bg-base transition pointer" @click="dialogMode = 'transactions'">
      <div class="align-center">
        <CrossIcon class="margin-right red-stroke" style="transform: scale(.666)" />
        <span class="red">Delete all transactions</span>
      </div>
      <Icon icon="arrow" />
    </div>

    <div class="bg-base transition pointer" @click="dialogMode = 'account'">
      <div class="align-center">
        <CrossIcon class="margin-right red-stroke" style="transform: scale(.666)" />
        <span class="red">Delete account</span>
      </div>
      <Icon icon="arrow" />
    </div>
  </section>

  <Dialog v-if="dialogMode === 'email'">
    <div class="dialog-header">
      <h2>Change email</h2>
      <Icon icon="cross" clickable @click="dialogMode = false" />
    </div>
    <span class="h4">Type your new email to update your account. <br>The message will be sent to the new email address.</span>
    <form @submit.prevent="changeEmail" style="margin-top: 2.5em">
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

  <Dialog v-else-if="dialogMode === 'password'">
    <div class="dialog-header">
      <h2>Change password</h2>
      <Icon icon="cross" clickable @click="dialogMode = false" />
    </div>
    <span class="h4">Click the button to receive an email to change your current password</span><br>
    <Button btnCss="margin-top: 1em" @click="changePassword">Submit</Button>
  </Dialog>

  <Dialog v-else-if="dialogMode === 'transactions'">
    <div class="dialog-header">
      <h2>Delete transactions</h2>
      <Icon icon="cross" clickable @click="dialogMode = false" />
    </div>
    <span class="h4">Click the button below to continue.<br><strong>All</strong> your transactions will be deleted <i>permanently</i>.</span><br>
    <Button btnCss="margin-top: 1em" @click="deleteTransactions">Delete all transactions</Button>
  </Dialog>

  <Dialog v-else-if="dialogMode === 'account'">
    <div class="dialog-header">
      <h2>Delete account</h2>
      <Icon icon="cross" clickable @click="dialogMode = false" />
    </div>
    <span class="h4">Click the button below to receive an email to continue.<br>Your account and your data will be <i>permanently deleted</i></span><br>
    <Button btnCss="margin-top: 1em" @click="deleteAccount">Submit</Button>
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
import { useAuthStore } from "S#/auth.store";

const store = useAuthStore();
const CrossIcon = defineAsyncComponent(() => import("../../assets/icons/cross.svg"));

const startValue = localStorage.getItem("currency");

const updateCurrency = newCurrency => {
  localStorage.setItem("currency", newCurrency);
  localStorage.setItem("currencySymbol", QUOTES[newCurrency].symbol);
};

// User update/delete
const dialogMode = ref(false);

const values = ref({});
const popup = ref({ success: null, msg: "" });

const changeEmail = async () => {
  if (!values.value.emailValid) return;
  popup.value = await store.changeEmailRequest(values.value.email);
  dialogMode.value = false;
};

const changePassword = async () => {
  popup.value = await store.changePasswordRequest();
  dialogMode.value = false;
};

const deleteTransactions = async () => {
  popup.value = await store.deleteTransactions();
  dialogMode.value = false;
};

const deleteAccount = async () => {
  popup.value = await store.deleteAccountRequest();
  dialogMode.value = false;
};
</script>

<style lang="sass" scoped>
  h1
    margin-bottom: .5em

  h2
    white-space: nowrap
    margin-right: 1em

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

  .dialog-header
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 1em
</style>

<style lang="sass">
  .red-stroke
    path
      stroke: $red
</style>