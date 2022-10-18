import BigNumber from "bignumber.js";

class DefiUtils extends BigNumber {
  WAD_BASIC_UNIT = new BigNumber(1e18);

  constructor(n: BigNumber.Value, base?: number) {
    super(n, base);
  }

  fullDecimalsToBigNumber = (decimals: BigNumber.Value): DefiUtils => {
    return new DefiUtils(this.multipliedBy(`1e${decimals}`));
  };

  bigNumberToFullDecimals = (decimals: BigNumber.Value): DefiUtils => {
    return new DefiUtils(this.dividedBy(`1e${decimals}`));
  };

  tokensToUnderlyingAmount = (exchangeRate: BigNumber.Value): DefiUtils => {
    return new DefiUtils(
      new BigNumber(exchangeRate)
        .multipliedBy(this)
        .dividedBy(this.WAD_BASIC_UNIT)
    );
  };

  underlyingAmountToTokens = (exchangeRate: BigNumber.Value): DefiUtils => {
    return new DefiUtils(
      new BigNumber(this)
        .multipliedBy(this.WAD_BASIC_UNIT)
        .multipliedBy(this.WAD_BASIC_UNIT)
        .dividedBy(exchangeRate)
        .dividedBy(this.WAD_BASIC_UNIT)
    );
  };

  valueToUSD = (priceUSD: BigNumber.Value): DefiUtils => {
    return new DefiUtils(new BigNumber(this).multipliedBy(priceUSD));
  };
}

export default DefiUtils;
