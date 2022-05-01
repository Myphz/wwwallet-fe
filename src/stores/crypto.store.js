import { defineStore } from "pinia";
import { fetchBinance, fetchServer } from "@/helpers/fetch.helper.js";
import createSocket from "@/helpers/createSocket.helper";
import { getPastQuantity } from "@/helpers/transactions.helper";
import { getPair } from "@/helpers/crypto.helper";
import { KLINES_LIMIT } from "@/config/config";

export const useCryptoStore = defineStore("crypto", {
  state: () => ({
    prices: {},
    tickerInfo: {},
  }),

  actions: {
    async init() {
      // 1. Get 24h prices and volume for every ticker
      // 2. Get exchange information for every ticker
      // 3. Get market cap and symbol-name conversion for every ticker
      const [startPrices, exchangeInfo, cryptoInfo] = await Promise.all([fetchBinance("ticker/24hr"), fetchBinance("exchangeInfo"), fetchServer("crypto/info")]);

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
      const socket = createSocket("ws/!miniTicker@arr");
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
      const { end, start, noSocket, noSlice } = opts || {};
      let url = `klines?symbol=${crypto.toUpperCase()}${base.toUpperCase()}&interval=${interval}&limit=${KLINES_LIMIT}`;
      if (end) url += `&endTime=${end}`;
      if (start) url += `&startTime=${start}`;
      const klines = await fetchBinance(url);

      let socket;
      if (!noSocket) socket = createSocket(`ws/${crypto.toLowerCase()}${base.toLowerCase()}@kline_${interval}`);
      
      return {
        klines: klines.length && (noSlice ? klines : klines.map(kline => kline.slice(0, 5).map(k => parseFloat(k)))),
        socket
      };
    },

    async getDashboardKlines(crypto, base, interval, transactions, opts) {
      const { end, noSocket, isAuth } = opts || {};

      // Helper function to shrink the klines and multiply each value by the quantity
      const convertKlines = (crypto, klines) => {
        // Loop over each kline and multiply its value by the quantity (except the time)
        return klines.map(kline => [kline[0], ...kline.slice(1, 5).map(v => parseFloat(getPastQuantity(kline[6], transactions[crypto]).times(v).toFixed(2)) )]);
      };

      if (crypto !== "TOTAL") {
        // If the selected view is not "TOTAL", just return the klines applied to the convertKlines function
        let { klines, socket } = await this.getKlines(crypto, base, interval, { noSlice: true, ...opts });
        if (!klines) return { klines: [] };
        klines = convertKlines(crypto, klines);
        return { klines: klines.filter(kline => kline[1]), socket };
      };

      // Get all cryptos and klines for every crypto
      const cryptos = Object.keys(transactions);
      
      let klinesAll = await Promise.all(cryptos.map(key => 
        fetchBinance(`klines?symbol=${key}${base.toUpperCase()}&interval=${interval}&limit=${KLINES_LIMIT}` + (end ? `&endTime=${end}` : "")) 
      )); 

      if (!klinesAll.length) return { klines: [] };
      // Add start padding if the length is not the same
      const maxLength = Math.max(...klinesAll.map(klines => klines.length));
      klinesAll = klinesAll.map(klines => [...Array(maxLength - klines.length).fill([0,0,0,0,0]), ...klines]);
      // Initialize retKlines with the first converted series of klines
      let retKlines = convertKlines(cryptos[0], klinesAll[0]);
      
      for (let i = 1; i < klinesAll.length; i++) {
        const klines = convertKlines(cryptos[i], klinesAll[i]);
        // Loop over each next klines, convert them and add each single value to retKlines
        retKlines = retKlines.map((kline, j) => [kline[0], ...kline.slice(1).map((v, k) => v + (klines[j]?.[k+1] || 0))]);
      }

      let socket;
      if (!noSocket && isAuth) 
        socket = createSocket("stream?streams=" + cryptos.map(crypto => `${crypto.toLowerCase()}${base.toLowerCase()}@kline_${interval}`).join("/"));

      retKlines = retKlines.filter(kline => kline[1]).map(kline => kline.map(k => parseFloat(k.toFixed(2))));

      return {
        // Remove empty candles and round every number to 2 digits
        klines: retKlines,
        socket,
      };
    },

    async getPastPrice(time, crypto) {
      const [res] = await fetchBinance(`klines?symbol=${getPair(crypto, this.prices)}&interval=1m&startTime=${time}&endTime=${time + 60000}&limit=1`);
      return res?.[4] || 0;
    }
  }
});