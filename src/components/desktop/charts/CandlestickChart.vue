<template>
  <VChart :option="option" />
</template>

<script>
import options from "@/config/charts/candlestickChartOptions.js";
import { onMounted, reactive, toRefs } from "vue";
import { useCryptoStore } from "S#/crypto.store";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CandlestickChart } from "echarts/charts";
import { GridComponent, DataZoomComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";

export default {
  props: {
    crypto: {
      type: String,
      required: true
    },

    base: {
      type: String,
      required: true
    },

    interval: {
      type: String,
      required: true
    }
  },

  components: { VChart },

  setup(props) {
    use([CandlestickChart, CanvasRenderer, GridComponent, DataZoomComponent, TooltipComponent ]);
    const store = useCryptoStore();
    const { crypto, base, interval } = toRefs(props);
    const option = reactive(options);

    onMounted(async () => {
      const klines = await store.getKlines(crypto.value, base.value, interval.value);
      option.series.data = klines;
    });

    store.$subscribe((_, state) => {
      const { o, h, l, c, E } = state.prices[crypto.value + base.value];
    });

    return { option }
  }
}
</script>

<style lang="sass">
  canvas
    border-radius: 0 0 1.5em 1.5em
    cursor: crosshair
</style>