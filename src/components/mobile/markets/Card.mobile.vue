<template>
  <RouterLink custom v-slot="{ navigate }" to="/crypto/btc">
    <tr @click="navigate" class="h4 transition">
      <td class="align-center">
        <img 
          :src="iconUrl" 
          :alt="crypto" 
          onerror="this.onerror = null; this.src='/src/assets/icons/generic.svg'"
          class="icon"
        >
        <span>
          <div class="title">{{ name }}</div> <div class="ticker">{{ crypto }}</div>
        </span>
      </td>

      <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
        ${{ price }}
      </td>

      <td :class="pctChange.startsWith('+') ? 'green' : pctChange.startsWith('-') ? 'red' : ''">
        {{ pctChange }}
      </td>
    </tr>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed, ref, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";
import { getDollarPrice, getPercentageChange } from "@/helpers/getPrice.helper";
import { formatPercentage, formatValue } from "@/helpers/formatNumber.helper";
import getCryptoIcon from "@/helpers/getCryptoIcon.helper";
import { cryptoSymbol } from "crypto-symbol";
const { nameLookup } = cryptoSymbol({});

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true
  }
});

const name = nameLookup(crypto, {exact: true}) || crypto;
const iconUrl = getCryptoIcon(crypto);

const store = useCryptoStore();
const price = computed(() => formatValue(getDollarPrice(crypto, store.prices)));
const volume = formatValue(store.tickerInfo[crypto].volume);
const pctChange = computed(() => formatPercentage(getPercentageChange(crypto, store.prices)));

const isHigher = ref(null);
watch(price, (newPrice, oldPrice) => {
  isHigher.value = newPrice > oldPrice;
});
</script>

<style lang="sass" scoped>
  tr
    border-bottom: 1px solid $primary
    cursor: pointer
    &:hover
      background-color: lighten($bg-base, 5%)

  td
    padding: 0.7em 1em

  .icon
    margin-right: 1em

  img
    width: 32px
    height: 32px
</style>