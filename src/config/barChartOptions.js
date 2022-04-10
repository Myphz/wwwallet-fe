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
      fontSize: 20
    }
  },

  textStyle: {
    fontSize: 16,
    color: primary,
  },

  xAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: gridColor,
      }
    },

    axisLabel: {
      fontSize: 16,
      color: primary
    },

    min: value => Math.min(value.min * 1.1, 0),
    max: value => value.max * 1.1,
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

    data: ["BTC", "MATIC", "ETH", "LUNA"]
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
        value: -500,
        itemStyle: {color: red},
      }
    ]
  }
}