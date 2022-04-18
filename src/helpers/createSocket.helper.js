import { BINANCE_BASE_URL_WS } from "@/config/config.js";

// Helper function to initialize and return a WebSocket from a binance ws endpoint
export default function(endpoint) {
  const socket = new WebSocket(BINANCE_BASE_URL_WS + endpoint);

  socket.onopen = () => {
    socket.send(JSON.stringify({
      method: "SUBSCRIBE",
      params: [ endpoint ],
      id: 1
    }));
  };

  return socket
}