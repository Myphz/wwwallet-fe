<template>
  <section :class="'main-section nohover ' + bgColor" v-if="(authStore.transactions?.[crypto] || transactions).length">
    <table :class="(shorter ? 'short' : '')">
      <thead>
        <tr>
          <th v-if="withTicker">Token</th>
          <th>Pair</th>
          <th>Side</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Value</th>
          <th>Date</th>
          <th v-if="!withTicker && $route.params.isAuth"></th>
        </tr>
      </thead>
      <tbody>
        <Transaction 
          v-for="transaction in (authStore.transactions?.[crypto] || transactions).slice().reverse().slice(page*10, (page+1)*10)" 
          :key="transaction._id" 
          :crypto="crypto"
          :transaction="transaction" 
          :withTicker="withTicker" 
          :shorter="shorter" 
          :fontSize="fontSize" 
        />
      </tbody>
    </table>
    <section class="justify-center" style="gap: 5em; padding: .5em 0" v-if="(authStore.transactions?.[crypto] || transactions).length > 10">
      <Icon
        :class="'transactions-arrow-icon noselect reverse ' + (!page ? 'inactive' : 'transition pointer')" 
        @click="page ? page-- : null"
      />
      <Icon
        :class="'transactions-arrow-icon noselect ' + ((page+1) * 10 <= (authStore.transactions?.[crypto] || transactions).length ? 'transition pointer' : 'inactive')" 
        @click="(page+1) * 10 <= (authStore.transactions?.[crypto] || transactions).length ? page++ : null" 
      />
    </section>
  </section>
  <div v-else-if="$route.params.isAuth" :class="'nohover ' + bgColor">
    <h4>No transactions registered for {{ crypto }} yet...</h4>
  </div>
  <div v-else :class="'nohover ' + bgColor">
    <h4><RouterLink to="/login">Login</RouterLink> or <RouterLink to="/register">Register</RouterLink> to record transactions</h4>
  </div>
</template>

<script setup>
import Transaction from "D#/wallet/Transaction.vue";
import { useAuthStore } from "S#/auth.store";
import { defineAsyncComponent, ref } from "vue";
import { RouterLink } from "vue-router";

const Icon = defineAsyncComponent(() => import("../../../assets/icons/arrow.svg"));

defineProps({
  crypto: {
    type: String,
    required: true
  },

  transactions: {
    type: Array,
    default: []
  },

  fontSize: {
    type: String,
    default: "h4"
  },

  bgColor: {
    type: String,
    default: "bg-dark"
  },

  withTicker: {
    type: Boolean,
    default: true
  },

  shorter: {
    type: Boolean,
    default: false
  }
});

const page = ref(0);
const authStore = useAuthStore();
</script>

<style lang="sass" scoped>
  .main-section
    border-radius: 1.5em

  .short
    th
      padding: .5em 1em

  div
    border-radius: .5em
    padding: 1.5em

  h4
    font-weight: normal

  a
    color: darken($text-primary, 15%)
    text-decoration: underline
</style>

<style lang="sass">
  .transactions-arrow-icon
    width: 48px
    height: 48px  
    path
      fill: none
    &:not(.inactive):hover
      background-color: lighten($bg-dark, 10%)

  .reverse
    transform: scaleX(-1)

  .inactive
    path
      stroke: $text-secondary  
</style>