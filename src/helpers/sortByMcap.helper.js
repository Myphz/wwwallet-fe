export default function(store) {
  return (a, b) => (store.tickerInfo[b]?.mcap || 0) - (store.tickerInfo[a]?.mcap || 0);
}