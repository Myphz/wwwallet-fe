export default function(cryptos, tickers) {
  if (!cryptos.length || !Object.keys(tickers).length) return [];
  let ret = tickers[cryptos[0]].quotes;

  for (let i = 1; i < cryptos.length; i++) {
    ret = ret.filter(value => tickers[cryptos[i]].quotes.includes(value));
  };

  return ret;
}