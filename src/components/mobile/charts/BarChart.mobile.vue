<template>
  <VChart v-if="Object.keys(earnings).length" :option="option" />
  <h2 class="note shadow" v-else>Nothing to show yet...</h2>
</template>

<script>
import options from "@/config/charts/barChartOptions.mobile.js";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { computed, reactive, toRefs } from "vue";

import extractSass from "@/helpers/extractSass.helper.js";

export default {
  components: { VChart },

  props: {
    earnings: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    use([BarChart, CanvasRenderer, TooltipComponent, LegendComponent]);
    const option = reactive(options);

    const green = extractSass("green");
    const red = extractSass("red");
    
    const { earnings } = toRefs(props);

    option.series.data = computed(() => Object.entries(earnings.value).map(([_, earnings]) => ({
      value: earnings.toNumber(),
      itemStyle: { color: earnings.gte(0) ? green : red }
    })));

    option.xAxis.data = computed(() => Object.keys(earnings.value));

    return { option }
  }
}
</script>

<style lang="sass" scoped>
  .note
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center
    background-color: $bg-base
    border-radius: .25em
    padding: .5em
    white-space: nowrap
    opacity: .9
</style> 