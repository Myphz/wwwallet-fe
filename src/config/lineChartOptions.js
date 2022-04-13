import extractSass from "@/helpers/extractSass.helper.js";
const primaryColor = extractSass("text-primary");

export default {
  yAxis: {
    show: false,
    min: value => value.min * (1 + (value.min - value.max) / value.min),
    max: value => value.max * (1 + (value.max - value.min) / value.max),
  },

  xAxis: {
    show: false,
    scale: true,
  },

  series: {
    type: "line",
    showSymbol: false,
    lineStyle: {
      color: primaryColor,
    },
  }
}