<template>
  <section>
    <Chart crypto="BTC" base="USDT">
      <Transactions crypto="BTC" />
      <div class="justify-center bottom">
        <Button btnClass="h4 bg-dark bottom-rounded noborder" @click="openPopup">+ Add Transaction</Button>
      </div>
    </Chart>
    <TransactionPopup v-show="displayPopup" @close="displayPopup = false"/>
  </section>
</template>

<script setup>
import Chart from "@/components/mobile/Chart.mobile.vue";
import Transactions from "@/components/mobile/Transactions.mobile.vue";
import TransactionPopup from "@/components/mobile/TransactionPopup.mobile.vue";
import Button from "@/components/Button.vue";
import { ref } from "vue";

const displayPopup = ref(false);
const openPopup = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
  displayPopup.value = true;
}
</script>

<style lang="sass" scoped>
  .bottom
    padding-bottom: 10vh  
</style>