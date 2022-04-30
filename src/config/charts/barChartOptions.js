import extractSass from "@/helpers/extractSass.helper.js";
import { formatValue } from "@/helpers/formatter.helper.js";

const primary = extractSass("primary");
const textPrimary = extractSass("text-primary");
const gridColor = extractSass("grid-color");
const bgColor = extractSass("bg-base");

export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: primary + "15",
      }
    },

    formatter([{ axisValueLabel, marker, value }]) {
      return `${marker} <strong>${axisValueLabel}</strong>: ${formatValue(value, 2)}`;
    },

    backgroundColor: bgColor,
    borderColor: primary,
    textStyle: {
      color: textPrimary,
      fontSize: 20
    }
  },

  textStyle: {
    fontSize: 16,
    color: primary,
  },

  xAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        color: gridColor,
      }
    },

    axisLabel: {
      fontSize: 16,
      color: primary
    },
  },

  yAxis: {
    type: "category",

    splitLine: {
      show: true,
      lineStyle: {
        color: gridColor,
      }
    },

    inverse: true,

    axisTick: {
      show: false
    },

    axisLabel: {
      fontSize: 20,
      color: textPrimary
    },
  },
  
  series: {
    type: "bar"
  }
}