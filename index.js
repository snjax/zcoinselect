const _ = require("lodash");


module.exports = zcoinselect;



function measure(v1, v2, v3) {
  const v0 = [v3[0]>>1n, v3[1]>>1n];

  const p1 = (v1[0] > 0n ? 4 : 0) + (v2[0] > 0n ? 4 : 0) + v1[2] + v2[2];
  const p2 = (v1[0] - v0[0])**2n + (v2[0] - v0[0]) ** 2n + (v1[1] - v0[1])**2n + (v2[1] - v0[1]) ** 2n
  return [p1, p2]
}

function cmp(m1, m2) {
  if (m1[0] < m2[0]) return -1;
  if (m1[0] > m2[0]) return 1;

  if (m1[1] < m2[1]) return 1;
  if (m1[1] > m2[1]) return -1;

  return 0;
}

function check(v1, v2, v3) {
  return ((v1[0] + v2[0]) >= v3[0]) && ((v1[1] + v2[1]) >= v3[1]);
}


/**
 * 
 * @param {Array} coins [assetId, assetAmount, nativeAmount]
 * @param {Array} amount [assetId, assetAmount, nativeAmount], fee included
 */

function zcoinselect(coins, amount) {
  amount = amount.map(x => BigInt(x));
  coins = coins.map(c => c.map(x => BigInt(x)));
  coins = coins.map(c => c[1] === 0 ? [amount[0], 0n, c[2]] : c);
  coins = coins.map(c => c[0] != amount[0] ? [null, 0n, c[2]] : c);

  const in_vectors = coins.map(c => coins[0] === amount[0] ? [c[1], c[2], 1] : [c[1], c[2], 0]);
  const res_vector = [amount[1], amount[2]];

  const not_enough = [true, true];
  let result = [];
  let result_measure = [0, -(1n << 256n)];


  for (let i = 0; i < in_vectors.length; i++) {
    for (let j = i + 1; j < in_vectors.length; j++) {
      const v1 = in_vectors[i];
      const v2 = in_vectors[j];
      if ((v1[0] + v2[0]) >= res_vector[0]) not_enough[0] = false;
      if ((v1[1] + v2[1]) >= res_vector[1]) not_enough[1] = false;
      if (!check(v1, v2, res_vector))
        continue;
      const new_result = [i, j];
      const new_result_measure = measure(v1, v2, res_vector);
      if (cmp(new_result_measure, result_measure) == 1) {
        result = new_result;
        result_measure = new_result_measure;
      }

    }
  }

  return {
    result,
    not_enough
  };
}