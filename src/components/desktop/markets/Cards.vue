<template>
  <table>
    <thead class="text-secondary">
      <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Price</th>
        <th>24h Change</th>
        <th>Market Cap</th>
      </tr>
    </thead>
    <tbody>
      <Card v-for="crypto in cryptoList" :key="crypto" :crypto="crypto" />
    </tbody>
  </table>
  <section class="justify-center" style="gap: 5em; margin-top: 1em">
    <Icon :class="'arrow-icon noselect reverse ' + (!page ? 'inactive' : 'bg-base transition pointer')" @click="page ? page-- : null"/>
    <Icon :class="'arrow-icon noselect ' + ((page+1) * 10 <= cryptoLen ? 'bg-base transition pointer' : 'inactive')" @click="(page+1) * 10 <= cryptoLen ? page++ : null" />
  </section>
</template>

<script setup>
import Card from "D#/markets/Card.vue";
import { computed, defineAsyncComponent, ref, toRefs } from "vue";
import { useCryptoStore } from "S#/crypto.store";
import { byMcap } from "@/helpers/sort.helper";

const Icon = defineAsyncComponent(() => import("../../../assets/icons/arrow.svg"));
const props = defineProps({
  search: {
    type: String,
    required: true
  }
});

const { search } = toRefs(props);

const page = ref(0);
const store = useCryptoStore();
const crypto = computed(() => (
  Object.keys(store.tickerInfo)
  .filter(ticker => ticker.includes(search.value))
  .sort(byMcap(store))));

const cryptoLen = computed(() => crypto.value.length);
const cryptoList = computed(() => crypto.value.slice(page.value*10, (page.value+1)*10));
</script>

<style lang="sass">
  .arrow-icon
    width: 64px
    height: 64px  
    path
      fill: none

  .reverse
    transform: scaleX(-1)

  .inactive
    path
      stroke: $text-secondary
</style>