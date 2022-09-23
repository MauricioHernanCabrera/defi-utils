# Defi-Utils
> An Accessible Defi Utility for Defi

[![NPM](https://img.shields.io/npm/v/defi-utils.svg)](https://www.npmjs.com/package/defi-utils) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save defi-utils
```
or 
```bash
yarn add defi-utils
```

## Usage

- Usage Example with TSX/Typescript

```tsx
import DefiUtils from 'defi-utils'

const TOKEN_USDC = {
  decimals: 6,
  exchangeRate: "200006742877822",
}

const value = 6

const result = new DefiUtils(value)
  .fullDecimalsToBigNumber(TOKEN_USDC.decimals)
  .underlyingAmountToTokens(TOKEN_USDC.exchangeRate)
  .toFixed(0);

console.log({ value, result }) // { value: 6, result: '29998988602' }
```



**fullDecimalsToBigNumber:** 
<br>
Method to transform a full decimal number to big number

```tsx
import DefiUtils from 'defi-utils'

const TOKEN_USDC = {
  decimals: 6,
}

const value = 6

const result = new DefiUtils(value)
  .fullDecimalsToBigNumber(TOKEN_USDC.decimals)
  .toString();

console.log({ value, result }) // { value: 6, result: '6000000' }
```



**bigNumberTofullDecimals:**
<br>
Method to transform a big number to full decimal number

```tsx
import DefiUtils from 'defi-utils'

const TOKEN_USDC = {
  decimals: 6,
}

const value = 600000

const result = new DefiUtils(value)
  .bigNumberTofullDecimals(TOKEN_USDC.decimals)
  .toString();

console.log({ value, result }) // { value: 600000, result: '6' }
```



**tokensToUnderlyingAmount:**
<br>
Method to transform a token to underlying amount

```tsx
import DefiUtils from 'defi-utils'

const TOKEN_USDC = {
  exchangeRate: "200006742877822",
}

const value = 4999831433

const result = new DefiUtils(value)
  .tokensToUnderlyingAmount(TOKEN_USDC.exchangeRate)
  .toFixed(0)

console.log({ value, result }) // { value: 4999831433, result: '1000000' }
```



**underlyingAmountToTokens:**
<br>
Method to transform a underlying amount to token

```tsx
import DefiUtils from 'defi-utils'

const TOKEN_USDC = {
  exchangeRate: "200006742877822",
}

const value = 1000000

const result = new DefiUtils(value)
  .underlyingAmountToTokens(TOKEN_USDC.exchangeRate)
  .toFixed(0)

console.log({ value, result }) // { value: 1000000, result: '4999831434' }
```



**valueToUSD:**
<br>
Method to transform a value in USD

```tsx
import DefiUtils from 'defi-utils'

const TOKEN_AXS = {
  priceUSD: 12.48
}

const value = 64

const result = new DefiUtils(value)
  .valueToUSD(TOKEN_AXS.priceUSD)
  .toString()

console.log({ value, result }) // { value: 64, result: '798.72' }
```

## License

MIT