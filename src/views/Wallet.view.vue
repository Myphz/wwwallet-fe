<template>
  <section>
    <h1>Your Wallet</h1>
    <SearchBar />
    <Wallet />
    <div class="btn-container">
      <Button btnClass="h3 bg-primary rounded noborder" @click="openPopup">+ Add Transaction</Button>
    </div>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false"/>
  </section>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
import Wallet from "@/components/Wallet.vue";
import Button from "@/components/Button.vue";
import TransactionPopup from "@/components/TransactionPopup.vue";
import { ref } from "vue";

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>

<style lang="sass" scoped>
  h1
    font-weight: normal
    margin-bottom: .5em

  .btn-container
    margin-top: 2em
</style>