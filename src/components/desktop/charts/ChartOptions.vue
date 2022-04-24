<template>
  <header class="noselect space-between">
    <span class="align-center">
      <Select 
        class="text-primary h2" 
        :options="cryptoList"
        :startValue="selectedCrypto"
        v-model="selectedCrypto"
        iconSize="small"
      />
      <Select 
        class="text-primary h2" 
        :options="baseOptions"
        :startValue="base"
        v-model="selectedBase"
        @update:modelValue="$emit('update:Base', selectedBase)"
        iconSize="small"
      />
    </span>
    <Icon icon="settings" />
  </header>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import Select from "U#/Select.vue";
import { computed, getCurrentInstance, ref, watch } from "vue";
import { useCryptoStore } from "S#/crypto.store";
import { useRouter } from "vue-router";

const { crypto, base } = defineProps({
  crypto: {
    type: String,
    required: true
  },

  base: {
    type: String,
    required: true
  }
});

const store = useCryptoStore();
const router = useRouter();

const selectedCrypto = ref(crypto);
const selectedBase = ref(base);

const baseOptions = computed(() => store.tickerInfo[selectedCrypto.value]?.quotes || []);
const cryptoList = computed(() => Object.keys(store.tickerInfo));

const { emit } = getCurrentInstance();
watch(selectedCrypto, newCrypto => {
  router.replace({ name: "crypto", params: { crypto: newCrypto } });
  emit("update:Crypto", newCrypto);
});
</script>

<style lang="sass" scoped>
  h2
    font-weight: normal

  span
    margin: 0 2.5em

  header
    padding: 1em 0
    border-bottom: 1px solid $bg-paper
        
  img
    width: 48px
    height: 48px
    cursor: pointer
    margin-right: 4em

</style>