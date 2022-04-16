import { defineStore } from "pinia";
import { BINANCE_BASE_URL } from "@/config/config.js";

export const useCryptoStore = defineStore("crypto", {
  state: () => ({
    prices: {}
  }),

  actions: {
    init() {
      // Socket to subscribe to all miniTickers
      const socket = new WebSocket(BINANCE_BASE_URL + "!miniTicker@arr");
      socket.onopen = () => {
        socket.send(JSON.stringify({
          method: "SUBSCRIBE",
          params: [ "!miniTicker@arr" ],
          id: 1
        }));
      }

      socket.onmessage = this.priceUpdate;
    },

    // Parse array of data from the miniTicker socket
    priceUpdate(prices) {
      const data = JSON.parse(prices.data);
      if (data.result === null) return;
      data.forEach(miniTicker => {
        this.prices[miniTicker.s] = parseFloat(miniTicker.c);
      });
    }
  }
});