# zcoinselect
Coin selection library for 2 to 2 transactions and 2 to 1+1 withdrawals


## Example

```js
> const z = require("zcoinselect");
> z([[1n, 10n, 5n], [1n, 15n, 4n]], [1n, 20n, 4n], 1n)
[1, 2]
```