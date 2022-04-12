import extractSass from "@/helpers/extractSass.helper.js";
const primary = extractSass("primary");
const textPrimary = extractSass("text-primary");
const gridColor = extractSass("grid-color");
const bgColor = extractSass("bg-base");

const green = "#47B262";
const red = "#EB5454";

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
      return `${marker} <strong>${axisValueLabel}</strong>: ${value} (+2.54%)`;
    },

    backgroundColor: bgColor,
    borderColor: primary,
    textStyle: {
      color: textPrimary,
      fontSize: 16
    }
  },

  textStyle: {
    fontSize: 16,
    color: primary,
  },

  xAxis: {
    type: "category",

    splitLine: {
      show: true,
      lineStyle: {
        color: gridColor,
      }
    },

    axisTick: {
      show: false
    },

    axisLabel: {
      fontSize: 16,
      color: textPrimary
    },

    data: ["BTC", "MATIC", "ETH", "LUNA"]
  },

  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: gridColor,
      }
    },

    axisLabel: {
      fontSize: 12,
      color: primary
    },
  },
  
  series: {
    type: 'bar',

    data: [
      {
        value: 120,
        itemStyle: {color: green},
      },
      {
        value: 120,
        itemStyle: {color: green},
      },
      {
        value: -20,
        itemStyle: {color: red},
      },
      {
        value: -498.22,
        itemStyle: {color: red},
      }
    ]
  }
}