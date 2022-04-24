import { QUOTES_DOLLAR } from "@/config/config";

// Helper function to retrieve the dollar price object of a given asset
const getPriceObj = (crypto, prices) => {
  const quote = QUOTES_DOLLAR.find(quote => (crypto + quote) in prices);
  return prices[crypto + quote];
}

export const getDollarPrice = (crypto, prices) => {
  const price = getPriceObj(crypto, prices);
  return price?.c || 0
}

export const calculatePercentage = price => {
  if (!price) return 0;
  return (price.c - price.o) / price.c;
}

export const getPercentageChange = (crypto, prices) => {
  const price = getPriceObj(crypto, prices);
  return calculatePercentage(price);
}