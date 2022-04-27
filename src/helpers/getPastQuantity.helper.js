import Big from "big.js";

// Function to extract the crypto quantity at a specific timestamp
export default function(time, transactions) {
  let ret = Big(0);

  for (const { date, isBuy, quantity } of transactions) {
    if (date > time) continue;
    if (isBuy) ret = ret.plus(quantity);
    else ret = ret.minus(quantity);
  }

  return ret;
}