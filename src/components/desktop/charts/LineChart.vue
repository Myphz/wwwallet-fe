<template>
  <VChart :option="option" autoresize />
</template>

<script>
import options from "@/config/charts/lineChartOptions.js";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import VChart from "vue-echarts";
import { onMounted, reactive, toRefs, watch } from "vue";

import { useCryptoStore } from "S#/crypto.store";
import { ANALYSIS_TIMES } from "@/config/config";
import { byMcap } from "@/helpers/sort.helper";

export default {
  components: { VChart },

  props: {
    crypto: {
      type: String,
      required: true
    },

    frequency: {
      type: String,
      required: true
    }
  },

  setup(props) {
    use([LineChart, CanvasRenderer]);
    // Deep copy option not to alter the original
    const optionCopy = JSON.parse(JSON.stringify(options));
    const option = reactive(optionCopy);

    const { crypto, frequency } = toRefs(props);
    const store = useCryptoStore();

    const loadData = () => {
      const unwatch = watch(store.prices, async () => {
        const { klines } = await store.getKlines(crypto.value, store.tickerInfo[crypto.value].quotes.sort(byMcap(store))[0], "1h", { 
          noSocket: true, 
          start: frequency.value !== "TOTAL" ? (+new Date() - ANALYSIS_TIMES[frequency.value]) : null
        });
        option.series.data = klines;
        unwatch();
      })
    };

    onMounted(loadData);

    watch([crypto, frequency], loadData);
    return { option };
  }
}
</script>