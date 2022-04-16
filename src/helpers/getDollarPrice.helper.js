const QUOTES_DOLLAR = ["USDT", "USDC", "BUSD", "UST"];

// Helper function to retrieve the dollar price value of a given asset
export default function(crypto, prices) {
  const quote = QUOTES_DOLLAR.find(quote => (crypto + quote) in prices);
  return prices[crypto + quote]?.c || 0
}