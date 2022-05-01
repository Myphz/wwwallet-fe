import { QUOTES_DOLLAR, GATEIO_ICON_URL } from "@/config/config";

// Helper function to retrieve the dollar price object of a given asset
const getPriceObj = (crypto, prices) => {
  if (!prices) return;
  const quote = QUOTES_DOLLAR.find(quote => (crypto + quote) in prices);
  return prices[crypto + quote];
}

export function getPrice(crypto, base, prices) {
  if (!crypto || !base) return;
  return prices[crypto + base]?.c || 0;
}

export function getPair(crypto, prices) {
  return crypto + QUOTES_DOLLAR.find(quote => (crypto + quote) in prices);
};

export function getDollarPrice(crypto, prices) {
  if (QUOTES_DOLLAR.includes(crypto)) return 1;
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