const _ = require("lodash");


module.exports = zcoinselect;

const maxAmount = coins => coins.slice(-2).reduce((a, b) => a[1] + b[1]);

/*
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
}*/

/*
Working fast with low number of utxos (<100). May be improved using topological sorting.


coin = [assetId, assetAmount, nativeAmount]
*/


function zcoinselect(coins, amount, fee) {
  amount = amount.map(x=>BigInt(x));
  coins = coins.map(c=>c.map(x=>BigInt(x)));
  fee = BigInt(fee);

  let coins_enumerated = coins.map((c, i) => [...c, i]);

  let not_enough = [true, true];
  let best_result = [];

  for(let i = 0; i<coins_enumerated.length; i++) {
    const ce = coins_enumerated[i];
    for (let j = 0; j<coins_enumerated.length; j++) {
      const ca = coins_enumerated[j];
      if (ce[3]==ca[3]) continue;
      if ((ce[0]==amount[0] ? ce[1] : 0n) + (ca[0]==amount[0] ? ca[1] : 0n)  >= amount[2]) not_enough[0] = false;
      if (ce[2] + ca[2] >= amount[2] + fee) not_enough[1] = false;
      if ((ce[2] + ca[2] >= amount[2] ) && ((ce[0]==amount[0] ? ce[1] : 0n) + (ca[0]==amount[0] ? ca[1] : 0n)  >= amount[2])) {
        return {result: [ce[3], ca[3]], not_enough};
      }
    }
  }

  return {result: [], not_enough};

}