import { BINANCE_BASE_URL_WS } from "@/config/config.js";

// Helper function to initialize and return a WebSocket from a binance ws endpoint
export default function(endpoint) {
  return new WebSocket(BINANCE_BASE_URL_WS + endpoint);
}