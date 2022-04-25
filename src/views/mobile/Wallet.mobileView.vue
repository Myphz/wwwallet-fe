<template>
  <section v-if="$route.params.isAuth">
    <h1>Your Wallet</h1>
    <SearchBar />
    <Suspense>
      <Wallet />
      <template #fallback>
        Loading.....
      </template>
    </Suspense>
    <div class="btn-container">
      <Button btnClass="h4 bg-primary rounded noborder" @click="displayPopup = true">+ Add Transaction</Button>
    </div>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false" @request="value => request = value" />
    <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" mobile />
  </section>
  <section v-else>
    <h1>Your Wallet</h1>
    <h3>Please <RouterLink to="/login" class="link">Login</RouterLink> or <RouterLink to="/register" class="link">Register</RouterLink> to check your wallet</h3>
  </section>
</template>

<script setup>
import SearchBar from "U#/SearchBar.vue";
import Wallet from "M#/wallet/Wallet.mobile.vue";
import Button from "U#/Button.vue";
import TransactionPopup from "M#/wallet/TransactionPopup.mobile.vue";
import Popup from "U#/Popup.vue";
import { ref } from "vue";

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