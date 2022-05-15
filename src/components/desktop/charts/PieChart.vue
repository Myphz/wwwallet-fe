<template>
  <VChart :option="option" autoresize />
</template>

<script>
import options from "@/config/charts/pieChartOptions.js";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { reactive, toRefs, watch } from "vue";

export default {
  components: { VChart },

  props: {
    currentValues: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    use([PieChart, CanvasRenderer, TooltipComponent, LegendComponent]);
    const option = reactive(options);
    const { currentValues } = toRefs(props);

    const convert = () => {
      option.series.data = Object.entries(currentValues.value)
        .filter(([name, value]) => value.gt(0))
        .reduce((prev, [name, value]) => [...prev, { name, value: value.toNumber() }], []);
    };
    convert();

    watch(currentValues, convert);
    return { option };
  }
}
</script>