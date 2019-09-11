const _ = require("lodash");


module.exports = zcoinselect;

const maxAmount = coins => coins.slice(-2).reduce((a, b) => a[1] + b[1]);


function zcoinselect(coins, amount) {
  amount = BigInt(amount);

  coins = [[undefined, 0n], [undefined, 0n], ..._.sortBy(coins.map((e, i) => [i, BigInt(e)]), e => e[1])];

  const MaxAmount = maxAmount(coins);
  if (amount > MaxAmount)
    return null;
  if (amount == 0n)
    return null;

  const s = (i, d) => (coins[i][1] + coins[i + d][1]) >= amount;

  let i = coins.length - 2;
  let d = 1;
  while (i > 0) {
    if (s(i - 1, d)) {
      i -= 1;
    } else if (s(i - 1, d + 1)) {
      i -= 1;
      d += 1;
    } else break;
  }
  return [coins[i][0], coins[i + d][0]].filter(e => typeof e !== "undefined")
}