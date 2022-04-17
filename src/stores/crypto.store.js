import { defineStore } from "pinia";
import { BINANCE_BASE_URL_WS } from "@/config/config.js";
import fetchBinance from "@/helpers/fetchBinance.helper.js";
import { getDollarPrice } from "@/helpers/getPrice.helper.js";

export const useCryptoStore = defineStore("crypto", {
  state: () => ({
    prices: {},
    tickerInfo: {},
    quoteAssets: new Set(),
  }),

  actions: {
    async init() {
      // Get 24h prices and volume for every ticker
      const startPrices = await fetchBinance("ticker/24hr");
      // Get exchange information for every ticker
      const exchangeInfo = await fetchBinance("exchangeInfo");
      
      // Initialize this.prices following miniTicker's convention
      startPrices.forEach(crypto => {
        const { symbol, openPrice, highPrice, lowPrice, lastPrice, volume } = crypto;
        this.prices[symbol] = {
          o: parseFloat(openPrice),
          h: parseFloat(highPrice),
          l: parseFloat(lowPrice),
          c: parseFloat(lastPrice),
          v: parseFloat(volume)
        }
      });

      // Initialize socket to subscribe to all miniTickers and get real time updates
      const socket = new WebSocket(BINANCE_BASE_URL_WS + "!miniTicker@arr");
      socket.onopen = () => {
        socket.send(JSON.stringify({
          method: "SUBSCRIBE",
          params: [ "!miniTicker@arr" ],
          id: 1
        }));
      };

      socket.onmessage = this.priceUpdate;
      // Retrieve all possible assets used as quote
      this.quoteAssets = new Set(exchangeInfo.symbols.map(symbol => symbol.quoteAsset));
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
      if (data.result === null) return;
      data.forEach(miniTicker => {
        // Save open, high, low, close, volume
        const { o, h, l, c, v, s } = miniTicker;
        this.prices[s] = { 
          o: parseFloat(o), 
          h: parseFloat(h), 
          l: parseFloat(l), 
          c: parseFloat(c), 
          v: parseFloat(v)
        };
      });
    },

    async getKlines(crypto, base, interval) {
      const klines = await fetchBinance(`klines?symbol=${crypto.toUpperCase()}${base.toUpperCase()}&interval=${interval}`);
      return klines.map(kline => kline.slice(0, 5).map(k => parseFloat(k)));
    }
  }
});