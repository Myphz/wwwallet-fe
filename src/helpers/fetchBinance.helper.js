import { BINANCE_BASE_URL_HTTPS } from "@/config/config.js";
// Helper function to fetch data from binance endpoint
export default async function(endpoint) {
  const res = await fetch(BINANCE_BASE_URL_HTTPS + endpoint);
  return await res.json();
}