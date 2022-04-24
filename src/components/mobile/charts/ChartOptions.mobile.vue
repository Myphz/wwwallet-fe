<template>
  <header class="noselect space-between align-center">
    <span class="align-center">
      <Select 
        class="margin-left text-primary h2" 
        :options="cryptoList"
        :startValue="selectedCrypto"
        v-model="selectedCrypto"
        iconSize="small"
        mobile
      />

      <Select 
        class="text-primary h2" 
        :options="baseOptions"
        :startValue="base"
        v-model="selectedBase"
        @update:modelValue="$emit('update:Base', selectedBase)"
        iconSize="small"
        mobile
      />

    </span>

    <Icon icon="settings" class="margin-right" />
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
  header
    padding: 1em 0
    border-bottom: 1px solid $bg-paper

  h2
    font-weight: normal
        
  img
    width: 36px
    height: 36px
    cursor: pointer

  .margin-left
    margin-left: 1em

  .margin-right
    margin-right: 1em

</style>