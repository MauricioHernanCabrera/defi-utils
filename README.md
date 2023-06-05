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

/**
 * Convert a full decimals value into basic units
 *
 * @param decimals
 * @returns DefiUtils
 */
new DefiUtils("1").toBasicUnits(18).toString() // 100000000000000000000

/**
 * Convert a basic units value into full decimals
 *
 * @param decimals
 * @returns DefiUtils
 */
new DefiUtils("100000000000000000000").toFullDecimals(18).toString() // 1

/**
 * Convert a token amount into underlying amount
 * 
 * @param exchangeRate
 * @returns DefiUtils
 */
new DefiUtils("4999831433").toUnderlying("200006742877822").toString() // 1000000

/**
 * Convert a underlying amount into token amount
 *
 * @param exchangeRate
 * @returns DefiUtils
 */
new DefiUtils("1000000").toTokens("200006742877822").toString() // 4999831434

/**
 * Convert a value into a usd value
 *
 * @param priceUSD
 * @returns DefiUtils
 */
new DefiUtils("20").toUSD(2).toString() // 40

/**
 * Convert a value usd into a value
 *
 * @param priceUSD
 * @returns DefiUtils
 */
new DefiUtils("40").fromUSD(2).toString() // 20

```

## License

MIT