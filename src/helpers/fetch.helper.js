import { SERVER_BASE_URL } from "@/config/config.js";

// Helper function to fetch data from backend
export const fetchServer = async (endpoint, body, additionalParams) => {
  const res = await fetch(SERVER_BASE_URL + endpoint, {
    method: body ? "POST" : "GET",
    body: JSON.stringify(body),
    headers: body ? { "Content-Type": "application/json" } : {},
    credentials: "include",
    ...(additionalParams || {}),
  });

  return await res.json();
};

// Helper function to fetch data from binance endpoint
export const fetchBinance = async endpoint => {
  return await fetchServer(`crypto/binance/${endpoint}`);
};