const borderColor = "#001d3d";
const textColor = "#003A7B";

export default {
  backgroundColor: "#000f20",
  xAxis: { 
    type: "time",
    axisLabel: {
      formatter: function(value) {
        const date = new Date(value);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
      },

      color: textColor,
      fontSize: "1em"
    },

    splitLine: {
      show: true,
      lineStyle: {
        color: borderColor
      }
    },

    scale: true
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        color: borderColor
      }
    },

    axisLabel: {
      color: textColor,
      fontSize: "1em"
    },

    scale: true
  },

  series: {
    type: "candlestick",
    // Set first element to X axis, the other ones to Y axis
    encode: {
      x: 0,
      // Convert COLH to OHLC
      y: [4, 1, 3, 2]
    },
  }
}