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
  
  series: {
    type: 'pie',
    radius: ['50%', '60%'],
    
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
        fontSize: 16
      }
    },

    emptyCircleStyle: {
      color: bgColor
    },

    data: []
  }
}