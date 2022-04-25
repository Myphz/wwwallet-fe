<template>
  <tr :class="'h4 transition main-row'" @click="open = !open">
    <td class="align-center">
      <img 
        :src="getCryptoIcon(crypto)" 
        :alt="crypto"
        onerror="this.onerror = null; this.src='/src/assets/icons/generic.svg'"
      >
      <span class="ticker">{{ crypto }}</span>
    </td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">${{ currentValue.toFormat(2) }}</td>
    <td>{{ totalQty.toFormat() }}</td>
    <td :class="'arrow ' + (open ? 'open' : '')"></td>
  </tr>
  <tr v-show="open" class="transactions-row">
    <td colspan="4">
      <Transactions :crypto="crypto" :withTicker="false" bgColor="bg-base-dark" fontSize="h5" @request="value => request = value" />
    </td>
  </tr>
  <Popup :success="request.success" :message="request.msg" @endAnimation="request.success = null" mobile />
</template>

<script setup>
import Transactions from "M#/wallet/Transactions.mobile.vue";
import Popup from "U#/Popup.vue";
import { ref, watch, computed } from "vue";
import { useAuthStore } from "S#/auth.store";
import { useCryptoStore } from "S#/crypto.store";
import { getDollarPrice } from "@/helpers/getPrice.helper";
import getCryptoIcon from "@/helpers/getCryptoIcon.helper";
import Big from "@/helpers/big.helper.js"

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();
const cryptoStore = useCryptoStore();
const open = ref(false);

const transactions = computed(() => authStore.transactions[crypto]);

const totalQty = computed(() => {
  const ret = transactions.value.reduce((prev, curr) => {
    const { isBuy, price, base, quantity } = curr;
    if (isBuy) {
      return { 
        ...prev, 
        buy: { 
          totalQty: prev.buy.totalQty.plus(quantity), 
          totalSum: prev.buy.totalSum.plus(new Big(getDollarPrice(base, cryptoStore.prices)).times(price).times(quantity)) 
        }
      };
    }

    return { 
      ...prev, 
      sell: { 
        totalQty: prev.sell.totalQty.plus(quantity), 
        totalSum: prev.sell.totalSum.plus(new Big(getDollarPrice(base, cryptoStore.prices)).times(price).times(quantity)) 
      }
    };
  }, {
      buy: { totalQty: new Big(0), totalSum: new Big(0) },
      sell: { totalQty: new Big(0), totalSum: new Big(0) }
     }
  );

  return ret.buy.totalQty.minus(ret.sell.totalQty);
});

const currentValue = computed(() => totalQty.value.times(getDollarPrice(crypto, cryptoStore.prices)));

const isHigher = ref(null);
watch(currentValue, (newValue, oldValue) => {
  isHigher.value = newValue > oldValue;
});

const request = ref({success: null});
</script>

<style lang="sass" scoped>
  .main-row
    border-bottom: 1px solid $primary
    cursor: pointer
    &:hover
      background-color: lighten($bg-base, 10%)
    
  img
    width: 36px
    height: 36px
    margin-right: 1em

  .transactions-row
    background-color: darken($bg-base, 2%)
</style>