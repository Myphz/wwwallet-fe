export const formatValue = price => {
  if (!price) return "0.00";
  return price.toFixed(2);
}

export const formatPercentage = pct => {
  if (!pct) return "0.00%";
  const ret = (pct*100).toFixed(2) + "%";
  if (pct > 0) return "+" + ret;
  return ret;
}