<template>
  <section>
    <h1>Your Wallet</h1>
    <SearchBar v-model="search" />
    <Suspense>
      <Wallet :search="search" />
      <template #fallback>
        Loading.....
      </template>
    </Suspense>
    <div class="btn-container" v-if="$route.params.isAuth">
      <Button btnClass="h4 bg-primary rounded noborder" @click="displayPopup = true">+ Add Transaction</Button>
    </div>
    <div v-else style="margin-top: 2em">
      <h3 style="text-align: center"><RouterLink to="/login" class="link">Login</RouterLink> or <RouterLink to="/register" class="link">Register</RouterLink> now to check your wallet</h3>
    </div>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false" @request="value => request = value" />
  </section>
  <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" mobile />
</template>

<script setup>
import SearchBar from "U#/SearchBar.vue";
import Wallet from "M#/wallet/Wallet.mobile.vue";
import Button from "U#/Button.vue";
import TransactionPopup from "M#/wallet/TransactionPopup.mobile.vue";
import Popup from "U#/Popup.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const search = ref("");
const displayPopup = ref(false);

const request = ref({success: null, msg: ""});
</script>

<style lang="sass" scoped>
  h1, h3
    font-weight: normal
    margin-bottom: .5em

  .btn-container
    margin-top: 2em
</style>