export const formatValue = price => {
  return price.toFixed(2);
}

export const formatPercentage = pct => {
  const ret = (pct*100).toFixed(2) + "%";
  if (pct > 0) return "+" + ret;
  return ret;
}