export const BINANCE_BASE_URL_WS = "wss://stream.binance.com:9443/ws/";
export const BINANCE_BASE_URL_HTTPS = "https://api.binance.com/api/v3/";
export const QUOTES_DOLLAR = ["USDT", "USDC", "BUSD"];
// Helper function to fetch data from binance endpoint
export const fetchBinance = async endpoint => {
  const res = await fetch(BINANCE_BASE_URL_HTTPS + endpoint);
  return await res.json();
}