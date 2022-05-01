export function byMcap(store) {
  return (a, b) => (store.tickerInfo[b]?.mcap || 0) - (store.tickerInfo[a]?.mcap || 0);
}

export function byValue(values) {
  return (a, b) => values[b].minus(values[a]).toNumber();
}