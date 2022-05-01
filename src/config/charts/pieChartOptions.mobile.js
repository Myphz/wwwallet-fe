import extractSass from "@/helpers/extractSass.helper.js";
import { formatValue } from "@/helpers/formatter.helper.js";

const textPrimary = extractSass("text-primary");
const bgColor = extractSass("bg-base");

export default {
  tooltip: {
    trigger: 'item'
  },

  textStyle: {
    fontSize: 16,
  },

  color: ["#DB8C00", "#4DA3FF", "#EE6666", "#3BA272", "#9A60B4", "#FFDA19", "#EA7CCC", "#00FEEA", "#5F00FE"],
  
  series: {
    type: 'pie',
    radius: ['50%', '70%'],
    
    label: {
      fontSize: 16,
      color: textPrimary,
    },

    tooltip: {
      formatter({ marker, data, percent }) {
        const { value, name } = data;
        return `${marker} <strong>${name}</strong> - $${formatValue(value, 2)} (${percent}%)`
      },

      backgroundColor: bgColor,

      textStyle: {
        color: textPrimary,
        fontSize: 12
      }
    },

    emptyCircleStyle: {
      color: bgColor
    },

    data: []
  }
}