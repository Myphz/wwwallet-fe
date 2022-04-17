<template>
  <tr class="h4 transition">
    <td>
      <div class="align-center">
        <img 
          :src="iconUrl" 
          :alt="crypto" 
          onerror="this.onerror = null; this.src='/src/assets/icons/generic.svg'"
          class="icon"
        >
        <span class="title">{{ name }}</span>
      </div>
    </td>

    <td class="ticker">
      {{ crypto }}
    </td>

    <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
      ${{ price }}
    </td>

    <td :class="pctChange.startsWith('+') ? 'green' : pctChange.startsWith('-') ? 'red' : ''">
      {{ pctChange }}
    </td>

    <td>
      <div class="align-center space-between">
        <span>${{ volume }}</span>
        <Button btnClass="bg-outline h4" link="/crypto/btc">
          <span class="align-center">
            <span>Chart</span>
            <Icon icon="arrow" class="arrow-icon" />
          </span>
        </Button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Button from "U#/Button.vue";
import { computed, ref, toRefs, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";
import { getDollarPrice, getPercentageChange } from "@/helpers/getPrice.helper";
import { formatPercentage, formatValue } from "@/helpers/formatNumber.helper";
import getCryptoIcon from "@/helpers/getCryptoIcon.helper";
import { cryptoSymbol } from "crypto-symbol";
const { nameLookup } = cryptoSymbol({});

const props = defineProps({
  crypto: {
    type: String,
    required: true
  }
});

const { crypto } = toRefs(props);
const name = nameLookup(crypto.value, {exact: true}) || crypto.value;
const iconUrl = getCryptoIcon(crypto.value);

const store = useCryptoStore();
const price = computed(() => formatValue(getDollarPrice(crypto.value, store.prices)));
const volume = formatValue(store.tickerInfo[crypto.value].volume);
const pctChange = computed(() => formatPercentage(getPercentageChange(crypto.value, store.prices)));

const isHigher = ref(null);
watch(price, (newPrice, oldPrice) => {
  isHigher.value = newPrice > oldPrice;
});

</script>

<style lang="sass" scoped>
  tr
    border-bottom: 1px solid $primary
      
  .icon
    height: 64px
    width: 64px
    margin-right: 1em
  
  .arrow-icon
    display: inline-block
    margin-left: .5em
    width: 32px
    height: 32px

</style>