import { QUOTES, GATEIO_ICON_URL } from "@/config/config";
import { getDecimalDigits } from "@/helpers/formatter.helper";

// Helper function to retrieve the cryptoStore price object of a given asset
const getPriceObj = (crypto, prices, curr, once) => {
  if (!prices) return;
  const currency = curr || (localStorage.getItem("currency") || "USD");
  const quotes = QUOTES?.[currency]?.quotes || [currency];

  let quote = quotes.find(quote => (crypto + quote) in prices);
  if (quote) return prices[crypto + quote];
  
  // Helper function to divide all the values of an object by a conversion factor float, rounded up to originalDigits digits
  const transformObject = (price, conversionFactor, originalDigits) => 
    Object.fromEntries(Object.entries(price).map(([_, value]) => [_, parseFloat((value * conversionFactor).toFixed(originalDigits))]));

  quote = quotes.find(quote => (quote + crypto) in prices);
  if (quote) {
    const price = prices[quote + crypto];
    // The true price is 1/price.c, but the transformObject function will multiply it by the conversion factor.
    // To solve this, square the denominator so that price * 1/price^2 = 1/price
    const conversionFactor = 1 / (price.c**2);
    const originalDigits = getDecimalDigits(price.c);
    
    return transformObject(price, conversionFactor, originalDigits);
  }

  if (once) return;

  // Try to get price in USD, BTC or BNB (99.99% of Binance crypto have at least one of these as quote)
  let price, supportCurrency;

  for (const testCurrency of ["USD", "BTC", "BNB", "ETH"]) {
    [price, supportCurrency] = [getPriceObj(crypto, prices, testCurrency, true), testCurrency];
    if (price) break;
  }

  // If a suiting pair has not been found, give up
  if (!price) return {};

  let conversionFactor, originalDigits;

  // Check if current crypto + support currency quote exists
  // e.g: if the price of the selected crypto has been found in USD and the wanted currency is EUR, try to find an EURUSD pair
  // to convert the retrieved USD price
  for (const testCurrency of (QUOTES?.[supportCurrency]?.quotes || [supportCurrency])) {
    const quote = quotes.find(quote => (quote + testCurrency) in prices);
    if (quote) {
      conversionFactor = 1 / prices[quote + testCurrency].c;
      originalDigits = getDecimalDigits(prices[quote + testCurrency].c);
      break;
    }
  };

  if (conversionFactor) 
    return transformObject(price, conversionFactor, originalDigits)

  // Check if current crypto + support currency quote exists
  // e.g: if the price of the selected crypto has been found in USD and the wanted currency is EUR, try to find an USDEUR pair
  // to convert the retrieved USD price
  for (const testCurrency of (QUOTES?.[supportCurrency]?.quotes || [supportCurrency])) {
    const quote = quotes.find(quote => (testCurrency + quote) in prices);
    if (quote) {
      conversionFactor = prices[testCurrency + quote].c;
      originalDigits = getDecimalDigits(prices[testCurrency + quote].c);
      break;
    }
  };

  if (conversionFactor) 
    return transformObject(price, conversionFactor, originalDigits)
}

export function getPrice(crypto, base, prices) {
  if (!crypto || !base) return;
  return prices[crypto + base]?.c || 0;
}

// Retrieve asset's price in user's favorite currency
export function getFavPrice(crypto, prices) {
  const price = getPriceObj(crypto, prices);
  return price?.c || 0;
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