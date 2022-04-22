function getDecimalDigits(n) {
  const str = n.toString();
  const index = str.indexOf(".");
  return index === -1 ? 0 : str.length - index - 1;
}

function formatBigValue(price) {
  // Try with billions first
  let N = price / 1000000000;
  let Nsuffix = "B";
  if (N < 1) {
    N = price / 1000000;
    Nsuffix = "M";
  };

  return N.toFixed(2) + Nsuffix;
};

export const formatValue = price => {
  if (!price) return "0.00";
  if (price >= 500000) return formatBigValue(price);
  const decimalDigits = getDecimalDigits(price);
  return price.toLocaleString(undefined, { minimumFractionDigits: decimalDigits, maximumFractionDigits: decimalDigits });
}

export const formatPercentage = pct => {
  if (!pct) return "0.00%";
  const ret = (pct*100).toFixed(2) + "%";
  if (pct > 0) return "+" + ret;
  return ret;
}