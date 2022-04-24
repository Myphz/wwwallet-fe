import { defineStore } from "pinia";
import { fetchBinance, fetchServer } from "@/helpers/fetch.helper.js";
import createSocket from "@/helpers/createSocket.helper";
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
      // Get market cap and symbol-name conversion for every ticker
      const cryptoInfo = await fetchServer("crypto/info");
      // Initialize this.prices following miniTicker's convention
      startPrices.forEach(crypto => {
        const { symbol, openPrice, highPrice, lowPrice, lastPrice } = crypto;
        this.prices[symbol] = {
          o: parseFloat(openPrice),
          h: parseFloat(highPrice),
          l: parseFloat(lowPrice),
          c: parseFloat(lastPrice),
        }
      });

      // Initialize socket to subscribe to all miniTickers and get real time updates
      const socket = createSocket("!miniTicker@arr");
      socket.onmessage = this.priceUpdate;
      // For every crypto, get its possible quotes and precision
      exchangeInfo.symbols.forEach(crypto => {
        const { baseAsset, baseAssetPrecision, quoteAsset } = crypto;

        // Update or add the baseAsset in tickerInfo object
        // Example structure of tickerInfo:
        // {
        //   BTC: {
        //     precision: 8,                   # Precision digits of the asset
        //     quotes: ["USDT", "USDC", ...],  # Possible markets (e.g: BTCUSDT, BTCUSDC, ...)
        //     mcap: 92033939202.322           # Total market cap (in USD)
        //     name: "Bitcoin"                 # Crypto name
        //   },
        //    ETH: ...
        // }

        // IMPORTANT: 'mcap' and 'name' may be missing, 
        // as they come from the top 5000 crypto by marketcap on CoinMarketCap (and not from Binance)

        if (baseAsset in this.tickerInfo) {
          this.tickerInfo[baseAsset].quotes.push(quoteAsset);
        } else {
          this.tickerInfo[baseAsset] = {
            precision: baseAssetPrecision,
            quotes: [quoteAsset],
            ...cryptoInfo[baseAsset]
          }
        }
      });

    },

    // Action to parse array of data from the miniTicker socket
    priceUpdate(prices) {
      const data = JSON.parse(prices.data);
      data.forEach(miniTicker => {
        // Save open, high, low, close, volume
        const { o, h, l, c, s } = miniTicker;
        this.prices[s] = { 
          o: parseFloat(o), 
          h: parseFloat(h), 
          l: parseFloat(l), 
          c: parseFloat(c), 
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
        klines: klines.length && klines.map(kline => kline.slice(0, 5).map(k => parseFloat(k))),
        socket
      };
    }
  }
});