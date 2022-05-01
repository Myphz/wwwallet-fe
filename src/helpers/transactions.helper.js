import { getDollarPrice, getPrice } from "@/helpers/crypto.helper.js";
import { QUOTES_DOLLAR } from "@/config/config.js";
import { byMcap } from "@/helpers/sort.helper.js";
import Big from "@/helpers/big.helper.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloat(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(3);
}

export function generateTransactions(crypto, store) {
  if (!store) {
    const cryptos = Object.keys(crypto.tickerInfo).filter(key=>!QUOTES_DOLLAR.includes(key)).sort(byMcap(crypto)).slice(0, 5);
    return cryptos.reduce((prev, curr) => ({...prev, [curr]: generateTransactions(curr, crypto)}), {});
  }

  const nTransactions = randomInt(1, 3);
  const ret = [];

  for (let i = 0; i < nTransactions; i++) {
    const transaction = { base: "USDT" };
    transaction.isBuy = i < 2;
    let pct = randomFloat(-0.2, 0.2);
    const price = getDollarPrice(crypto, store.prices) || 30000;
    transaction.price = (price + price *  pct).toFixed(2);
    if (transaction.isBuy) transaction.quantity = "" + randomFloat(1000 / price, 5000 / price);
    else transaction.quantity = "" + randomFloat(1000 / price, ret[ret.length - 1].quantity);
    const now = +new Date();
    pct = randomFloat(transaction.isBuy ? -.1 : -.001, -.001);
    transaction.date = Math.floor(now + now * pct);
    ret.push(transaction);
  }

  return ret;
};

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
export function getStats(transactions, prices, opts) {
  if (!transactions) return transactions;
  if (transactions.constructor.name === "Object") {
    const ret = {};
    for (const [crypto, trans] of Object.entries(transactions)) {
      // Treat crypto as prices
      ret[crypto] = getStats(trans, prices, opts);
    }

    return ret;
  };

  const { end=Number.MAX_SAFE_INTEGER, start=0 } = opts || {};
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
    if (transaction.date > end || transaction.date < start) continue;
    
    if (transaction.isBuy) {
      ret.totalQuantity = ret.totalQuantity.plus(transaction.quantity);
      ret.buyQuantity = ret.buyQuantity.plus(transaction.quantity);
      buyPriceSum = buyPriceSum.plus( Big(transaction.price).times(transaction.quantity).times(getDollarPrice(transaction.base, prices)) );
    } else {
      ret.totalQuantity = ret.totalQuantity.minus(transaction.quantity);
      ret.sellQuantity= ret.sellQuantity.plus(transaction.quantity);
      sellPriceSum = sellPriceSum.plus( Big(transaction.price).times(transaction.quantity).times(getDollarPrice(transaction.base, prices)) );
    }
  };

  ret.avgBuyPrice = ret.buyQuantity.eq(0) ? Big(0) : buyPriceSum.div(ret.buyQuantity);
  ret.avgSellPrice = ret.sellQuantity.eq(0) ? Big(0) : sellPriceSum.div(ret.sellQuantity);

  return ret;
}

export function addEarnings(allTransactions, crypto, prices, opts) {
  if (!allTransactions) return allTransactions;
  // If it's an object
  if (allTransactions.constructor.name === "Object") {
    // Call itself recursively and return the final object
    const ret = {};
    for (const [base, transactions] of Object.entries(allTransactions)) {
      // Treat crypto as prices
      ret[base] = addEarnings(transactions, base, crypto, opts);
    }
    return ret;
  }
  // If it's an array
  // Parse parameters
  const { pastPrice, end=Number.MAX_SAFE_INTEGER, start=0, copy=false } = opts || {};
  // Get the total sell quantity
  let { sellQuantity: totSell } = getStats(allTransactions, prices, opts);

  const ret = [];
  // Loop over all the transactions
  for (let transaction of allTransactions.sort((trans1, trans2) => trans1.date - trans2.date)) {
    // If it's a copy, destructure the transaction not to modify the original
    if (copy) transaction = { ...transaction };
    // If it's not in the date constraints, ignore it
    if (transaction.date > end || transaction.date < start) {
      transaction.earnings = Big(0);
      transaction.change = Big(0);
      ret.push(transaction);
      continue;
    };
    // Get the price of reference
    const price = pastPrice?.[transaction.base] || transaction.price;
    // Get previous average buy price
    let quantity = Big(transaction.quantity);

    if (transaction.isBuy) {
      // Subtract the totSell to the transaction quantity and decrease totSell
      quantity = quantity.minus(totSell);

      totSell = totSell.minus(transaction.quantity);
      if (totSell.lt(0)) totSell = Big(0);

      // If it's <= 0, the buy transaction has been completely sold in the future, so ignore it
      if (quantity.lte(0)) {
        transaction.earnings = Big(0);
        transaction.change = Big(0);
        ret.push(transaction);
        continue
      }

      // Otherwise, multiply what's remaining by the current price and subtract the original cost
      transaction.earnings = quantity.times(getPrice(crypto, transaction.base, prices)).minus(quantity.times(price));
      transaction.change = transaction.earnings.div(quantity.times(price)).times(100);
    } else {
      const { avgBuyPrice } = getStats(allTransactions, prices, { end: transaction.date  });
      // Earnings = Transaction quantity * transaction price - Avg Buy price * transaction quantity
      transaction.earnings = quantity.times(price).minus(avgBuyPrice.times(quantity));
      transaction.change = transaction.earnings.div(quantity.times(avgBuyPrice)).times(100);
    };

    ret.push(transaction);
  };
  return ret;
};