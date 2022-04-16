<template>
  <VChart :option="option" />
</template>

<script>
import options from "@/config/charts/barChartOptions.mobile.js";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { reactive } from "vue";

export default {
  components: { VChart },

  setup() {
    use([BarChart, CanvasRenderer, TooltipComponent, LegendComponent]);
    const option = reactive(options);
    return { option }
  }
}
</script>