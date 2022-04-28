import { QUOTES_DOLLAR } from "@/config/config";

export const getPair = (crypto, prices) => {
  return crypto + QUOTES_DOLLAR.find(quote => (crypto + quote) in prices);
};

// Helper function to retrieve the dollar price object of a given asset
const getPriceObj = (crypto, prices) => {
  if (!prices) return;
  const quote = QUOTES_DOLLAR.find(quote => (crypto + quote) in prices);
  return prices[crypto + quote];
}

export const getDollarPrice = (crypto, prices) => {
  if (QUOTES_DOLLAR.includes(crypto)) return 1;
  const price = getPriceObj(crypto, prices);
  return price?.c || 0
}

export const calculatePercentage = price => {
  if (!price) return 0;
  return (price.c - price.o) / price.o;
}

export const getPercentageChange = (crypto, prices) => {
  const price = getPriceObj(crypto, prices);
  return calculatePercentage(price);
}