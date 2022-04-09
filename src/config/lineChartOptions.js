import extractSass from "@/helpers/extractSass.helper.js";
const primaryColor = extractSass("text-primary");

export default {
  yAxis: {
    show: false,
    // min: value => value.min * .9,
    // max: value => value.min * 1.1,
    scale: true,
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