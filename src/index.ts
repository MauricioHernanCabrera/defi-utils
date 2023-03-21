import BigNumber from "bignumber.js";

class DefiUtils extends BigNumber {
  static WAD = new BigNumber(1e18).toString();
  static WAD_WAD = new BigNumber(1e36).toString();

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
      new BigNumber(exchangeRate).multipliedBy(this).dividedBy(DefiUtils.WAD)
    );
  };

  underlyingAmountToTokens = (exchangeRate: BigNumber.Value): DefiUtils => {
    return new DefiUtils(
      new BigNumber(this)
        .multipliedBy(DefiUtils.WAD)
        .multipliedBy(DefiUtils.WAD)
        .dividedBy(exchangeRate)
        .dividedBy(DefiUtils.WAD)
    );
  };

  valueToUSD = (priceUSD: BigNumber.Value): DefiUtils => {
    return new DefiUtils(new BigNumber(this).multipliedBy(priceUSD));
  };

  aprToApy = (apr: BigNumber.Value) => {
    const calc1 = new BigNumber(apr).dividedBy(365);
    const calc2 = new BigNumber(1).plus(calc1);
    const calc3 = new BigNumber(calc2).pow(365);

    return new DefiUtils(calc3.minus(1));
  };
}

export default DefiUtils;
