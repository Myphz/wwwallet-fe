<template>
  <tr :class="'h4 transition main-row'" @click="open = !open">
    <td class="align-center">
      <img 
        :src="getCryptoIcon(crypto)" 
        :alt="crypto"
        onerror="this.onerror = null; this.src='/src/assets/icons/generic.svg'"
      >
      <span class="title">{{ cryptoStore.tickerInfo[crypto]?.name || crypto }}</span>
      <span class="ticker">{{ crypto }}</span>
    </td>
    <td>${{ avgPrices.buy.toFormat(getDecimalDigits(transactions[0]?.price)) }}</td>
    <td>{{ !avgPrices.sell.eq(0) ? "$" + avgPrices.sell.toFormat(getDecimalDigits(transactions[0]?.price)) : "" }}</td>
    <td>{{ totalQty.toFormat() }}</td>
    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
      ${{ currentValue.toFormat(2) }}
    </td>
    <td :class="totalEarnings.s === -1 ? 'red' : totalEarnings.eq(0) ? '' : 'green'">
      {{ totalEarnings.s === -1 ? "-" : "" }}${{ totalEarnings.abs().toFormat(2) }}
    </td>
    <td :class="totalChange.s === -1 ? 'red' : totalChange.eq(0) ? '' : 'green'">
      {{ totalChange.s === -1 ? "-" : "" }}{{ totalChange.abs().toFormat(2) }}%
    </td>
    <td :class="'arrow ' + (open ? 'open' : '')"></td>
  </tr>
  <tr v-show="open" class="transactions-row">
    <td colspan="8">
      <Transactions 
        :crypto="crypto" 
        :withTicker="false"
        :transactions="$route.params.isAuth ? [] : transactions"
        bgColor="bg-base-dark" 
        fontSize="h5" 
        shorter 
        @request="value => $emit('request', value)" 
      />
    </td>
  </tr>
</template>

<script setup>
import Transactions from "D#/wallet/Transactions.vue";
import getCryptoIcon from "@/helpers/getCryptoIcon.helper";
import Big from "@/helpers/big.helper.js";
import generateRandomTransactions from "@/helpers/random.helper.js";
import { ref, watch, computed } from "vue";
import { useAuthStore } from "S#/auth.store";
import { useCryptoStore } from "S#/crypto.store";
import { getDollarPrice } from "@/helpers/getPrice.helper";
import { getDecimalDigits } from "@/helpers/formatNumber.helper";
import { useRoute } from "vue-router";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true,
  },
});

const route = useRoute();
defineEmits(["request"]);

const authStore = useAuthStore();
const cryptoStore = useCryptoStore();
const open = ref(false);

const transactions = route.params.isAuth ? computed(() => authStore.transactions[crypto] || []) : ref([]);
if (!route.params.isAuth) {
  const unwatch = watch(cryptoStore.prices, () => {
    transactions.value = generateRandomTransactions(crypto, cryptoStore);
    unwatch();
  });
}

const totals = computed(() => {
  return transactions.value.reduce((prev, curr) => {
    const { isBuy, price, base, quantity } = curr;
    if (isBuy) {
      return { ...prev, 
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
});

const avgPrices = computed(() => ({
  buy: !totals.value.buy.totalQty.eq(0) ? totals.value.buy.totalSum.div(totals.value.buy.totalQty) : new Big(0), 
  sell: !totals.value.sell.totalQty.eq(0) ? totals.value.sell.totalSum.div(totals.value.sell.totalQty) : new Big(0)
}));

const totalQty = computed(() => totals.value.buy.totalQty.minus(totals.value.sell.totalQty));
const currentValue = computed(() => totalQty.value.times(getDollarPrice(crypto, cryptoStore.prices)));

const totalEarnings = computed(() => {
  // The formula is as follows:
  // Total Earnings = Current Crypto Quantity * Current Price - Current Crypto Quantity * Avg Buy Price + Sold Quantity * (Average Sell Price - Average Buy Price)
  const oldValue = totalQty.value.times(avgPrices.value.buy);
  const soldEarnings = totals.value.sell.totalQty.times(avgPrices.value.sell.minus(avgPrices.value.buy));
  return currentValue.value.minus(oldValue).plus(soldEarnings);
});

const totalChange = computed(() => {
  if (currentValue.value.eq(0)) return Big(0);
  const oldValue = totalQty.value.times(avgPrices.value.buy);
  return currentValue.value.minus(oldValue).div(currentValue.value).times(100);
});

const isHigher = ref(null);
watch(currentValue, (newValue, oldValue) => {
  isHigher.value = newValue > oldValue;
});
</script>

<style lang="sass" scoped>
  .main-row
    border-bottom: 1px solid $primary
    cursor: pointer
    &:hover
      background-color: lighten($bg-base, 10%)
    
  img
    width: 48px
    height: 48px
    margin-right: 1em

  .transactions-row
    background-color: darken($bg-base, 2%)
</style>