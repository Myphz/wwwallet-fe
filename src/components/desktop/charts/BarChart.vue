<template>
  <VChart v-if="Object.keys(earnings).length" :option="option" :class="$route.params.isAuth ? '' : 'disabled'" />
  <h2 class="note shadow" v-else-if="$route.params.isAuth">Nothing to show yet...</h2>
  <h2 class="note shadow" v-if="!$route.params.isAuth">
    <RouterLink to="/login" class="link">Login</RouterLink> or <RouterLink to="/register" class="link">Register</RouterLink> now to check your wallet
  </h2>
</template>

<script>
import options from "@/config/charts/barChartOptions.js";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { computed, reactive, toRefs } from "vue";
import extractSass from "@/helpers/extractSass.helper.js";
import { RouterLink } from "vue-router";

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

    option.yAxis.data = computed(() => Object.keys(earnings.value));

    return { option }
  }
}
</script>

<style lang="sass" scoped>
  .disabled
    filter: blur(10px)
    pointer-events: none

  .note
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center
    background-color: $bg-base
    border-radius: .25em
    padding: .5em
    opacity: .9
</style>