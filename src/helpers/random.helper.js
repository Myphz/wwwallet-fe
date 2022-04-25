import { getDollarPrice } from "@/helpers/getPrice.helper.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloat(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(3);
}

export default function(crypto, store) {
  const nTransactions = randomInt(1, 3);
  const ret = [];

  for (let i = 0; i < nTransactions; i++) {
    const transaction = { base: "USDT" };
    transaction.isBuy = i < 2;
    let pct = randomFloat(-0.2, 0.2);
    const price = getDollarPrice(crypto, store.prices);
    transaction.price = (price + price *  pct).toFixed(2);
    if (transaction.isBuy) transaction.quantity = "" + randomFloat(1000 / price, 5000 / price);
    else transaction.quantity = "" + randomFloat(1000 / price, ret[ret.length - 1].quantity);
    const now = +new Date();
    pct = randomFloat(-0.1, 0);
    transaction.date = Math.floor(now + now * pct);
    ret.push(transaction);
  }

  return ret;
}