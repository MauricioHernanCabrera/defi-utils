import BigNumber from "bignumber.js";

export namespace DefiUtils {
  export interface Config extends BigNumber.Config {}
  export interface Format extends BigNumber.Format {}
  export interface Instance extends BigNumber.Instance {}
  export type Constructor = BigNumber.Constructor;
  export type ModuloMode = BigNumber.ModuloMode;
  export type RoundingMode = BigNumber.RoundingMode;
  export type Value = BigNumber.Value;
}

export class DefiUtils extends BigNumber {
  static WAD = new DefiUtils(1e18).toString();
  static WAD_WAD = new DefiUtils(1e36).toString();
  static SECONDS_PER_DAY = new DefiUtils(86400).toString();

  constructor(n: DefiUtils.Value, base?: number) {
    super(n, base);
  }

  override plus = (n: DefiUtils.Value, base?: number | undefined) => {
    return new DefiUtils(super.plus(n, base));
  };

  override minus = (n: DefiUtils.Value, base?: number | undefined) => {
    return new DefiUtils(super.minus(n, base));
  };

  override pow = (n: DefiUtils.Value, m?: DefiUtils.Value) => {
    return new DefiUtils(super.pow(n, m));
  };

  override div = (n: DefiUtils.Value, base?: number) => {
    return new DefiUtils(super.div(n, base));
  };

  override dividedBy = (n: DefiUtils.Value, base?: number) => {
    return new DefiUtils(super.dividedBy(n, base));
  };

  override multipliedBy = (n: DefiUtils.Value, base?: number) => {
    return new DefiUtils(super.multipliedBy(n, base));
  };

  /**
   * Convert a full decimals value into basic units
   *
   * @param decimals
   * @returns DefiUtils
   */
  toBasicUnits = (decimals: DefiUtils.Value): DefiUtils => {
    return new DefiUtils(this.multipliedBy(`1e${decimals}`));
  };

  /**
   * Convert a basic units value into full decimals
   *
   * @param decimals
   * @returns DefiUtils
   */
  toFullDecimals = (decimals: DefiUtils.Value): DefiUtils => {
    return new DefiUtils(this.dividedBy(`1e${decimals}`));
  };

  /**
   * Convert a token amount into underlying amount
   *
   * @param exchangeRate
   * @returns DefiUtils
   */
  toUnderlying = (exchangeRate: DefiUtils.Value): DefiUtils => {
    return new DefiUtils(
      new DefiUtils(exchangeRate).multipliedBy(this).dividedBy(DefiUtils.WAD)
    );
  };

  /**
   * Convert a underlying amount into token amount
   *
   * @param exchangeRate
   * @returns DefiUtils
   */
  toTokens = (exchangeRate: DefiUtils.Value): DefiUtils => {
    return new DefiUtils(
      new DefiUtils(this)
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
  toUSD = (priceUSD: DefiUtils.Value): DefiUtils => {
    return new DefiUtils(new DefiUtils(this).multipliedBy(priceUSD));
  };

  /**
   * Convert a value usd into a value
   *
   * @param priceUSD
   * @returns DefiUtils
   */
  fromUSD = (priceUSD: DefiUtils.Value): DefiUtils => {
    return new DefiUtils(new DefiUtils(this).dividedBy(priceUSD));
  };

  /**
   * Convert a apr into apy
   *
   * @returns DefiUtils
   */
  toAPY = (): DefiUtils => {
    const calc1 = new DefiUtils(this).dividedBy(365);
    const calc2 = new DefiUtils(1).plus(calc1);
    const calc3 = new DefiUtils(calc2).pow(365);

    return new DefiUtils(calc3.minus(1));
  };

  /**
   * Convert a apy into apr
   *
   * @returns DefiUtils
   */
  toAPR = (): DefiUtils => {
    const calc1 = new DefiUtils(this).plus(1);
    const calc2 = new DefiUtils(calc1).pow(new DefiUtils(1).dividedBy(365));
    const calc3 = new DefiUtils(calc2).minus(1).times(365);

    return new DefiUtils(calc3);
  };

  /**
   * Returns a string representation of the number without scientific notation.
   *
   * @returns string
   */
  removeScientificNotation = () => {
    return new DefiUtils(this).toFixed(
      new DefiUtils(this).decimalPlaces(),
      DefiUtils.ROUND_DOWN
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
    roundingMode?: DefiUtils.RoundingMode | undefined
  ) => {
    const value = this.toFixed(decimalPlaces, roundingMode);

    return new DefiUtils(value).toFixed(
      new DefiUtils(value).decimalPlaces(),
      roundingMode
    );
  };

  /**
   * Returns a safe string (avoid infinity and nan values)
   *
   * @returns string
   */
  toSafeString = () => {
    const value = this.isNaN() || !this.isFinite() ? "0" : this.toString();

    return value;
  };

  /**
   * Returns a safe number (avoid infinity and nan values)
   *
   * @returns string
   */
  toSafeNumber = () => {
    const value = this.isNaN() || !this.isFinite() ? 0 : this.toNumber();

    return value;
  };

  static override min(...n: DefiUtils.Value[]) {
    return new DefiUtils(super.min(...n));
  }

  static override max(...n: DefiUtils.Value[]) {
    return new DefiUtils(super.max(...n));
  }
}

export default DefiUtils;
