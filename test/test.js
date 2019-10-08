const random_bi = require('random-bigint')
const z = require('../index');
function randrange(from, to) {
  if (from == to)
    return from;
  if (from > to)
    [from, to] = [to, from];
  const interval = to - from;

  if (typeof from === "number")
    return from + Math.floor(Math.random() * interval);

  let t = 0;
  while (interval > (1n<<BigInt(t)))
    t++;
  return from + random_bi(t) % interval;
}


describe("zcoinselect", function () { 
  let coins;
  let amount;

  beforeEach(()=>{
    coins = Array(1000).fill(0).map(()=>[randrange(0n, 16n), randrange(0n, 50000n), randrange(0n, 50000n)]);
    amount = [randrange(0n, 16n), randrange(50000n, 75000n), randrange(50000n, 75000n)];
  });

  it("Add test for 1000 utxo", () => {
    const res = z(coins, amount);
    console.log(res);
    if (res.result.length>0) {
      const v1 = coins[res.result[0]];
      const v2 = coins[res.result[1]];
      const v3 = amount;
      console.log(v1, v2, v3, amount, `Deltas: [${((v1[0]==v3[0]) ? v1[1] : 0n) + ((v2[0]==v3[0]) ? v2[1] : 0n) - v3[1]}, ${v1[2] + v2[2] - v3[2]}]`);
    }
  })
});