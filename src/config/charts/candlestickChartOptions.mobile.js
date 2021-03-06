import extractSass from "@/helpers/extractSass.helper.js";
import { formatValue, formatDate, formatTime, getDecimalDigits } from "@/helpers/formatter.helper.js";

const gridColor = extractSass("grid-color");
const textColor = extractSass("primary");
const backgroundColor = extractSass("bg-dark");

function withClass(value, isPositive, withSymbol) {
  const styleClass = isPositive ? "green" : "red";
  return `<span class="${styleClass}">${withSymbol ? (isPositive ? "+" : "") : ""}${formatValue(value, null, true)}</span>`
}

export default {
  backgroundColor,
  animation: false,

  textStyle: {
    fontSize: 10
  },

  xAxis: { 
    type: "time",
    axisLabel: {
      show: false,
      formatter: formatTime,
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
        formatter: ({ value }) => formatDate(value),
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
        color: textColor
      },

      crossStyle: {
        color: textColor,
      }
    },

    // Static position
    position: [5, -15],

    // Function to format the data for the tooltip
    formatter: ([{ data }]) => {
      const [___, open, high, low, close] = data;
      const isPositive = close >= open;
      const diff = close - open;
      const change = (diff / open * 100).toFixed(2) + "%";
      return `O: ${withClass(open, isPositive)} H: ${withClass(high, isPositive)} L: \
      ${withClass(low, isPositive)} C: ${withClass(close, isPositive)} \
      %: ${withClass(change, isPositive, true)} (${withClass(diff.toFixed(getDecimalDigits(open)), isPositive, true)})`
    },

    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0,

    textStyle: {
      color: textColor,
      fontSize: 9
    },
  },

  grid: {
    left: 0,
    top: 20,
    right: 50,
    bottom: 0,
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
    data: [[0,0,0,0]]
  }
}