# zcoinselect
Coin selection library for 2 to 2 transactions and 2 to 1+1 withdrawals

Select 2 closest by amount UTXOs, enough to process transfer. If transfer cannot be processed, the client needs to join 2 UTXOs with highest amount.

## Example

```js
> const zcoinselect = require("zcoinselect");
> zcoinselect([1n, 2n, 4n, 8n], 6n)
[1, 2]
```