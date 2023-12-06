<template>
  <RouterLink custom v-slot="{ navigate }" :to="`/crypto/${crypto}`">
    <tr @click="navigate" class="h4 transition">
      <td class="align-center">
        <img
          :src="getIcon(crypto)"
          :alt="crypto"
          onerror="this.src='/icons/generic.svg'"
          class="icon"
        />
        <span>
          <div class="title">{{ store.tickerInfo[crypto].name || crypto }}</div>
          <div class="ticker">{{ crypto }}</div>
        </span>
      </td>

      <td :class="isHigher ? 'green' : isHigher !== null ? 'red' : ''">
        {{ price }}
      </td>

      <td
        :class="
          pctChange.startsWith('+')
            ? 'green'
            : pctChange.startsWith('-')
            ? 'red'
            : ''
        "
      >
        {{ pctChange }}
      </td>
    </tr>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed, ref, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";
import {
  getFavPrice,
  getPercentageChange,
  getIcon,
} from "@/helpers/crypto.helper";
import { formatPercentage, formatValue } from "@/helpers/formatter.helper";

const { crypto } = defineProps({
  crypto: {
    type: String,
    required: true,
  },
});

const store = useCryptoStore();

const price = computed(() => formatValue(getFavPrice(crypto, store.prices)));
const pctChange = computed(() =>
  formatPercentage(getPercentageChange(crypto, store.prices))
);

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
  border-radius: 999rem
  background: white
</style>
