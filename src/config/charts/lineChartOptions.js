import extractSass from "@/helpers/extractSass.helper.js";
const primaryColor = extractSass("text-primary");

export default {
  yAxis: {
    type: "value",
    show: false,
    scale: true,
    boundaryGap: ["60%", "60%"],
  },

  xAxis: {
    type: "time",
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