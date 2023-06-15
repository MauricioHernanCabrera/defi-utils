import BigNumber from "bignumber.js";

class DefiUtils extends BigNumber {
  static WAD = new BigNumber(1e18).toString();
  static WAD_WAD = new BigNumber(1e36).toString();
  static SECONDS_PER_DAY = new BigNumber(86400).toString();

  constructor(n: BigNumber.Value, base?: number) {
    super(n, base);
  }

  override plus = (n: BigNumber.Value, base?: number | undefined) => {
    return new DefiUtils(super.plus(n, base));
  };

  override minus = (n: BigNumber.Value, base?: number | undefined) => {
    return new DefiUtils(super.minus(n, base));
  };

  override pow = (n: BigNumber.Value, m?: BigNumber.Value) => {
    return new DefiUtils(super.pow(n, m));
  };

  override div = (n: BigNumber.Value, base?: number) => {
    return new DefiUtils(super.div(n, base));
  };

  override dividedBy = (n: BigNumber.Value, base?: number) => {
    return new DefiUtils(super.dividedBy(n, base));
  };

  override multipliedBy = (n: BigNumber.Value, base?: number) => {
    return new DefiUtils(super.multipliedBy(n, base));
  };

  /**
   * Convert a full decimals value into basic units
   *
   * @param decimals
   * @returns DefiUtils
   */
  toBasicUnits = (decimals: BigNumber.Value): DefiUtils => {
    return new DefiUtils(this.multipliedBy(`1e${decimals}`));
  };

  /**
   * Convert a basic units value into full decimals
   *
   * @param decimals
   * @returns DefiUtils
   */
  toFullDecimals = (decimals: BigNumber.Value): DefiUtils => {
    return new DefiUtils(this.dividedBy(`1e${decimals}`));
  };

  /**
   * Convert a token amount into underlying amount
   *
   * @param exchangeRate
   * @returns DefiUtils
   */
  toUnderlying = (exchangeRate: BigNumber.Value): DefiUtils => {
    return new DefiUtils(
      new BigNumber(exchangeRate).multipliedBy(this).dividedBy(DefiUtils.WAD)
    );
  };

  /**
   * Convert a underlying amount into token amount
   *
   * @param exchangeRate
   * @returns DefiUtils
   */
  toTokens = (exchangeRate: BigNumber.Value): DefiUtils => {
    return new DefiUtils(
      new BigNumber(this)
        .multipliedBy(DefiUtils.WAD)
        .multipliedBy(DefiUtils.WAD)
        .dividedBy(exchangeRate)
        .dividedBy(DefiUtils.WAD)
    );
  };

  /**
   * Convert a value into a usd value
   *
   * @param priceUSD
   * @returns DefiUtils
   */
  toUSD = (priceUSD: BigNumber.Value): DefiUtils => {
    return new DefiUtils(new BigNumber(this).multipliedBy(priceUSD));
  };

  /**
   * Convert a value usd into a value
   *
   * @param priceUSD
   * @returns DefiUtils
   */
  fromUSD = (priceUSD: BigNumber.Value): DefiUtils => {
    return new DefiUtils(new BigNumber(this).dividedBy(priceUSD));
  };

  /**
   * Convert a apr into apy
   *
   * @returns DefiUtils
   */
  toAPY = (): DefiUtils => {
    const calc1 = new BigNumber(this).dividedBy(365);
    const calc2 = new BigNumber(1).plus(calc1);
    const calc3 = new BigNumber(calc2).pow(365);

    return new DefiUtils(calc3.minus(1));
  };

  /**
   * Returns a string representation of the number without scientific notation.
   *
   * @returns string
   */
  removeScientificNotation = () => {
    return new BigNumber(this).toFixed(
      new BigNumber(this).decimalPlaces(),
      BigNumber.ROUND_DOWN
    );
  };

  /**
   * Returns a string representing the number with a fixed-point format,
   * removing trailing zeros at the end.
   *
   * @param decimalPlaces
   * @param roundingMode
   * @returns string
   */
  toSafeFixed = (
    decimalPlaces: number,
    roundingMode?: BigNumber.RoundingMode | undefined
  ) => {
    const value = this.toFixed(decimalPlaces, roundingMode);

    return new BigNumber(value).toFixed(
      new BigNumber(value).decimalPlaces(),
      roundingMode
    );
  };
}

export default DefiUtils;
