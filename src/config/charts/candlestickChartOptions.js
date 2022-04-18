import extractSass from "@/helpers/extractSass.helper.js";
import { timeFormat, dateFormat } from "@/helpers/formatDate.helper.js";

const gridColor = extractSass("grid-color");
const textColor = extractSass("primary");
const backgroundColor = extractSass("bg-dark");

function withClass(value, isPositive, withSymbol) {
  const styleClass = isPositive ? "green" : "red";
  return `<span class="${styleClass}">${withSymbol ? (isPositive ? "+" : "") : ""}${value}</span>`
}

export default {
  backgroundColor,

  textStyle: {
    fontSize: 16
  },

  xAxis: { 
    type: "time",
    axisLabel: {
      formatter: timeFormat,
      color: textColor,
      fontSize: "1em"
    },

    axisLine: {
      show: false,
      lineStyle: {
        color: gridColor,
      },
    },

    axisPointer: {
      label: {
        formatter: ({ value }) => dateFormat(value),
      }
    },

    axisTick: {
      show: false,
    },

    splitLine: {
      show: true,
      lineStyle: {
        color: gridColor
      }
    },

    scale: true,
  },
  yAxis: {
    position: "right",

    splitLine: {
      lineStyle: {
        color: gridColor
      }
    },

    axisLabel: {
      color: textColor,
      fontSize: "1em"
    },

    axisLine: {
      lineStyle: {
        color: gridColor,
      },
    },

    scale: true
  },

  dataZoom: {
    type: "inside",
    orient: "horizontal"
  },

  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      lineStyle: {
        color: textColor,
      },

      shadowStyle: {
        color: textColor,
      },

      crossStyle: {
        color: textColor,
      }
    },

    // Static position
    position: [55, 0],

    // Function to format the data for the tooltip
    formatter: ([{ data }]) => {
      const [___, open, high, low, close] = data;
      const isPositive = close >= open;
      const change = ((close - open) / open * 100).toFixed(2) + "%";
      return `Open: ${withClass(open, isPositive)} High: ${withClass(high, isPositive)} Low: \
      ${withClass(low, isPositive)} Close: ${withClass(close, isPositive)} \
      Change: ${withClass(change, isPositive, true)}`
    },

    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0,

    textStyle: {
      color: textColor,
      fontSize: "1.2em"
    },
  },

  grid: {
    left: 65,
    top: 50,
    right: 85,
    bottom: 50,
  },

  series: {
    type: "candlestick",
    // Set first element to X axis, the other ones to Y axis
    encode: {
      x: 0,
      // Convert COLH to OHLC
      y: [4, 1, 3, 2]
    },
    // Reduce gap between candles
    barWidth: "70%",
    data: [[0,0,0,0]],
  }
}