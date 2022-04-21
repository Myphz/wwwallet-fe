import { defineStore } from "pinia";
import { fetchBinance } from "@/helpers/fetch.helper.js";
import createSocket from "@/helpers/createSocket.helper";
import { getDollarPrice } from "@/helpers/getPrice.helper.js";
import { KLINES_LIMIT } from "@/config/config";

export const useCryptoStore = defineStore("crypto", {
  state: () => ({
    prices: {},
    tickerInfo: {},
  }),

  actions: {
    async init() {
      // Get 24h prices and volume for every ticker
      const startPrices = await fetchBinance("ticker/24hr");
      // Get exchange information for every ticker
      const exchangeInfo = await fetchBinance("exchangeInfo");
      // Get current timestamp in milliseconds
      const now = +new Date();
      // Initialize this.prices following miniTicker's convention
      startPrices.forEach(crypto => {
        const { symbol, openPrice, highPrice, lowPrice, lastPrice, volume } = crypto;
        this.prices[symbol] = {
          o: parseFloat(openPrice),
          h: parseFloat(highPrice),
          l: parseFloat(lowPrice),
          c: parseFloat(lastPrice),
          v: parseFloat(volume),
          E: now,
        }
      });

      // Initialize socket to subscribe to all miniTickers and get real time updates
      const socket = createSocket("!miniTicker@arr");
      socket.onmessage = this.priceUpdate;
      // For every crypto, get its possible quotes and precision
      exchangeInfo.symbols.forEach(crypto => {
        const { symbol, baseAsset, baseAssetPrecision, quoteAsset } = crypto;

        // Try to get a price for the current symbol in dollars to calculate the total volume
        const quotePrice = getDollarPrice(baseAsset, this.prices);

        // Update or add the baseAsset in tickerInfo object
        // Example structure of tickerInfo:
        // {
        //   BTC: {
        //     precision: 8,                   # Precision digits of the asset
        //     quotes: ["USDT", "USDC", ...],  # Possible markets (e.g: BTCUSDT, BTCUSDC, ...)
        //     volume: 1085673999.22,          # Total 24h volume in dollars
        //   },
        //    ETH: ...
        // }

        if (baseAsset in this.tickerInfo) {
          this.tickerInfo[baseAsset].volume += this.prices[symbol].v * quotePrice;
          this.tickerInfo[baseAsset].quotes.push(quoteAsset);
        } else {
          this.tickerInfo[baseAsset] = {
            precision: baseAssetPrecision,
            quotes: [quoteAsset],
            volume: this.prices[symbol].v * quotePrice,
          }
        }
      });
    },

    // Action to parse array of data from the miniTicker socket
    priceUpdate(prices) {
      const data = JSON.parse(prices.data);
      data.forEach(miniTicker => {
        // Save open, high, low, close, volume
        const { E, o, h, l, c, v, s } = miniTicker;
        this.prices[s] = { 
          o: parseFloat(o), 
          h: parseFloat(h), 
          l: parseFloat(l), 
          c: parseFloat(c), 
          v: parseFloat(v),
          E,
        };
      });
    },

    async getKlines(crypto, base, interval, opts) {
      const { end, noSocket } = opts || {};
      let url = `klines?symbol=${crypto.toUpperCase()}${base.toUpperCase()}&interval=${interval}&limit=${KLINES_LIMIT}`;
      if (end) url += `&endTime=${end}`;
      const klines = await fetchBinance(url);

      let socket;
      if (!noSocket) socket = createSocket(`${crypto.toLowerCase()}${base.toLowerCase()}@kline_${interval}`);

      return {
        klines: klines.map(kline => kline.slice(0, 5).map(k => parseFloat(k))),
        socket
      };
    }
  }
});