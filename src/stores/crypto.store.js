import { defineStore } from "pinia";
import { BINANCE_BASE_URL_WS, BINANCE_BASE_URL_HTTPS } from "@/config/config.js";

export const useCryptoStore = defineStore("crypto", {
  state: () => ({
    prices: {},
    tickerInfo: {}
  }),

  actions: {
    async init() {
      // Socket to subscribe to all miniTickers
      const socket = new WebSocket(BINANCE_BASE_URL_WS + "!miniTicker@arr");
      socket.onopen = () => {
        socket.send(JSON.stringify({
          method: "SUBSCRIBE",
          params: [ "!miniTicker@arr" ],
          id: 1
        }));
      };

      socket.onmessage = this.priceUpdate;

      // Get exchange information for every ticker
      let res = await fetch(BINANCE_BASE_URL_HTTPS + "exchangeInfo");
      res = await res.json();
      // For every symbol, get the relevant information
      this.tickerInfo = res.symbols.reduce((prev, current) => {
        const { symbol, baseAsset, baseAssetPrecision, quoteAsset, quoteAssetPrecision } = current;

        return {...prev, [symbol]: {
          baseAsset, baseAssetPrecision, quoteAsset, quoteAssetPrecision
        }};
      }, {});
    },

    // Parse array of data from the miniTicker socket
    priceUpdate(prices) {
      const data = JSON.parse(prices.data);
      if (data.result === null) return;
      data.forEach(miniTicker => {
        // Save open, high, low, close
        const { o, h, l, c, s } = miniTicker;
        this.prices[s] = { 
          o, h, l, c
        };
      });
    }
  }
});