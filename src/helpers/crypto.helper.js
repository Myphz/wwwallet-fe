import { QUOTES, GATEIO_ICON_URL } from "@/config/config";
import { getDecimalDigits } from "@/helpers/formatter.helper";

// Helper function to retrieve the cryptoStore price object of a given asset
const getPriceObj = (crypto, prices, curr, once) => {
  if (!prices) return;
  const currency = curr || (localStorage.getItem("currency") || "USD");
  const quote = QUOTES[currency].find(quote => (crypto + quote) in prices);
  if (quote) return prices[crypto + quote];
  if (once) return;

  // Try to get price in USD, BTC or BNB (all of Binance crypto have at least one of these as quote)
  let price, supportCurrency;

  for (const testCurrency of ["USD", "BTC", "BNB"]) {
    [price, supportCurrency] = [getPriceObj(crypto, prices, testCurrency, true), testCurrency];
    if (price) break;
  }

  let conversionFactor, originalDigits;

  // Check if current crypto + support currency quote exists
  // e.g: if the price of the selected crypto has been found in USD and the wanted currency is EUR, try to find an EURUSD pair
  // to convert the retrieved USD price
  for (const testCurrency of QUOTES[supportCurrency]) {
    const quote = QUOTES[currency].find(quote => (quote + testCurrency) in prices);
    if (quote) {
      conversionFactor = 1 / prices[quote + testCurrency].c;
      originalDigits = getDecimalDigits(prices[quote + testCurrency].c);
      break;
    }
  };

  if (conversionFactor) 
    return Object.fromEntries(Object.entries(price).map(([_, value]) => [_, parseFloat((value * conversionFactor).toFixed(originalDigits))]));

  // Check if current crypto + support currency quote exists
  // e.g: if the price of the selected crypto has been found in USD and the wanted currency is EUR, try to find an USDEUR pair
  // to convert the retrieved USD price
  for (const testCurrency of QUOTES[supportCurrency]) {
    const quote = QUOTES[currency].find(quote => (testCurrency + quote) in prices);
    if (quote) {
      conversionFactor = prices[testCurrency + quote].c;
      originalDigits = getDecimalDigits(prices[testCurrency + quote].c);
      break;
    }
  };

  if (conversionFactor) 
    return Object.fromEntries(Object.entries(price).map(([_, value]) => [_, parseFloat((value * conversionFactor).toFixed(originalDigits))]));
}

export function getPrice(crypto, base, prices) {
  if (!crypto || !base) return;
  return prices[crypto + base]?.c || 0;
}

// Retrieve asset's price in user's favorite currency
export function getFavPrice(crypto, prices) {
  const price = getPriceObj(crypto, prices);
  return price?.c || 0
};

export function calculatePercentage(price) {
  if (!price) return 0;
  return (price.c - price.o) / price.o;
};

export function getPercentageChange(crypto, prices) {
  const price = getPriceObj(crypto, prices);
  return calculatePercentage(price);
};

export function getBaseLCM(cryptos, tickers) {
  if (!cryptos.length || !Object.keys(tickers).length) return [];
  let ret = tickers[cryptos[0]].quotes;

  for (let i = 1; i < cryptos.length; i++) {
    ret = ret.filter(value => tickers[cryptos[i]].quotes.includes(value));
  };

  return ret;
};

export function getIcon(crypto) {
  return `${GATEIO_ICON_URL}${crypto.toLowerCase()}.png`;
}