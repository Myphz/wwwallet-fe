export const BINANCE_BASE_URL_WS = "wss://stream.binance.com:9443/";
export const SERVER_BASE_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:3000/api/";

// Stablecoins with a specific value
export const QUOTES = {
  USD: {
    quotes: ["USDT", "USDC", "BUSD", "UST", "DAI"],
    symbol: "$",
  },
  EUR: {
    quotes: ["EUR"],
    symbol: "€",
  },
  GBP: {
    quotes: ["GBP"],
    symbol: "£",
  }
};

export const KLINES_LIMIT = 1000;
export const TIMES = ["1m", "15m", "1h", "4h", "1d", "1w", "1M"];
export const ANALYSIS_TIMES = { TOTAL: 0, MONTHLY: 2592000000, WEEKLY: 604800000, DAILY: 86400000 }