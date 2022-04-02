import extractSass from "@/helpers/extractSass.helper.js";
const textPrimary = extractSass("text-primary");
const textSecondary = extractSass("text-secondary");

export default {
  tooltip: {
    trigger: 'item'
  },

  textStyle: {
    fontSize: "16",
  },

  // legend: {
  //   type: "scroll",
  //   top: "5%",
  //   textStyle: {
  //     color: textPrimary
  //   },

  //   pageIconColor: textPrimary,
  //   pageIconInactiveColor: textSecondary,
  //   pageTextStyle: {
  //     color: textPrimary
  //   }
  // },
  
  series: {
    type: 'pie',
    radius: ['50%', '60%'],
    // center: ['50%', '40%'],
    label: {
      color: textPrimary,
      overflow: "breakAll"
    },
    // labelLine: {
    //   show: false
    // },
    data: [
      { value: 1048, name: 'BTC' },
      { value: 735, name: 'LUNA' },
      { value: 580, name: 'XMR' },
      { value: 484, name: 'ETH' },
      { value: 300, name: 'MATIC' }
    ]
  }
}