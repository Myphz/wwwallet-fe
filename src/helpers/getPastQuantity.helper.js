import Big from "@/helpers/big.helper.js";

// Function to extract the crypto quantity at a specific timestamp in the past
export function getPastQuantity(time, transactions) {
  let ret = Big(0);

  for (const { date, isBuy, quantity } of transactions) {
    if (date > time) continue;
    if (isBuy) ret = ret.plus(quantity);
    else ret = ret.minus(quantity);
  }

  return ret;
}

// Function to extract general transactions statistics at a specific timestamp in the past
export function getPastStats(time, transactions) {
  const ret = { 
    totalQuantity: Big(0), 
    buyQuantity: Big(0), 
    sellQuantity: Big(0), 
    avgBuyPrice: null, 
    avgSellPrice: null 
  };

  let buyPriceSum = Big(0);
  let sellPriceSum = Big(0);

  for (const transaction of transactions) {
    if (transaction.date > time) continue;
    
    if (transaction.isBuy) {
      ret.totalQuantity = ret.totalQuantity.plus(transaction.quantity);
      ret.buyQuantity = ret.buyQuantity.plus(transaction.quantity);
      buyPriceSum = buyPriceSum.plus( Big(transaction.price).times(transaction.quantity) );
    } else {
      ret.totalQuantity = ret.totalQuantity.minus(transaction.quantity);
      ret.sellQuantity= ret.sellQuantity.plus(transaction.quantity);
      sellPriceSum = sellPriceSum.plus( Big(transaction.price).times(transaction.quantity) );
    }
  };

  ret.avgBuyPrice = ret.buyQuantity.eq(0) ? Big(0) : buyPriceSum.div(ret.buyQuantity);
  ret.avgSellPrice = ret.sellQuantity.eq(0) ? Big(0) : sellPriceSum.div(ret.sellQuantity);

  return ret;
}