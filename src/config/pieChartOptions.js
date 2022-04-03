import extractSass from "@/helpers/extractSass.helper.js";
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
        return `${marker} ${name} - $${value} (${percent}%)`
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

    data: [
      { value: 1048, name: 'BTC' },
      { value: 735, name: 'LUNA' },
      { value: 580, name: 'XMR' },
      { value: 484, name: 'ETH' },
      { value: 300, name: 'MATIC' },
      // { value: 484, name: 'ETH' },
      // { value: 484, name: 'ETH1' },
      // { value: 484, name: 'ETH2' },
      // { value: 484, name: 'ETH3' },
      // { value: 484, name: 'ETH4' },
      // { value: 484, name: 'ETH5' },
      // { value: 484, name: 'ETH6' },
      // { value: 484, name: 'ETH7' },
      // { value: 484, name: 'ETH8' },
      // { value: 484, name: 'ETH9' },
      // { value: 484, name: 'ETH10' },
      // { value: 484, name: 'ETH11' },
      // { value: 484, name: 'ETH12' },
      // { value: 484, name: 'ETH13' },
      // { value: 484, name: 'ETH14' },
      // { value: 484, name: 'ETH15' },
      // { value: 484, name: 'ETH16' },
      // { value: 484, name: 'ETH17' },
    ]
  }
}