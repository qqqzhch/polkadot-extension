// @ts-nocheck
import BN from 'bn.js';
import Decimal from 'decimal.js';

import AssetType from './AssetType';
import Usd from './Usd';

export default class Balance {
  constructor (assetType, valueAtomicUnits) {
    this.assetType = assetType;
    this.valueAtomicUnits = valueAtomicUnits;
  }

  static Native (config, valueAtomicUnits) {
    return new Balance(AssetType.Native(config), valueAtomicUnits);
  }

  valueOverExistentialDeposit () {
    const existentialDeposit = new Balance(
      this.assetType,
      this.assetType.existentialDeposit
    );
    const value = this.sub(existentialDeposit);
    const zero = new Balance(this.assetType, new BN(0));

    return Balance.max(value, zero);
  }

  static fromBaseUnits (assetType, valueBaseUnits) {
    const atomicUnitsPerBaseUnit = new Decimal(10).pow(
      new Decimal(assetType.numberOfDecimals)
    );
    const valueAtomicUnits = atomicUnitsPerBaseUnit.mul(new Decimal(valueBaseUnits.toString()));

    // This conversion to BN doesn't work if our valueAtomicUnits Decimal
    // is formatted as an exponent
    Decimal.set({ toExpPos: 1000 });

    return new Balance(assetType, new BN(valueAtomicUnits.toString()));
  }

  valueBaseUnits () {
    const balanceAtomicUnitsDecimal = new Decimal(
      this.valueAtomicUnits.toString()
    );
    const atomicUnitsPerBaseUnit = new Decimal(10).pow(
      new Decimal(this.assetType.numberOfDecimals)
    );
    const valueBaseUnits = balanceAtomicUnitsDecimal.div(
      new Decimal(atomicUnitsPerBaseUnit)
    );

    return valueBaseUnits;
  }

  toString (decimals = 3) {
    return this.valueBaseUnits().toDecimalPlaces(decimals, Decimal.ROUND_DOWN).toString();
  }

  toDisplayString (decimals = 3, roundDown = true) {
    const rounding = roundDown ? Decimal.ROUND_DOWN : Decimal.ROUND_UP;

    return `${this.valueBaseUnits()
      .toDecimalPlaces(decimals, rounding)
      .toNumber()
      .toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: 0
      })} ${this.assetType.ticker}`;
  }

  toFeeDisplayString () {
    return this.toDisplayString(6, false);
  }

  toUsd (usdPerToken: Usd) {
    return new Usd(this.valueBaseUnits().mul(usdPerToken.value));
  }

  eq (other) {
    if (this.assetType.assetId !== other.assetType.assetId) {
      throw new Error('Cannot compare different asset types');
    }

    return this.valueAtomicUnits.eq(other.valueAtomicUnits);
  }

  gt (other) {
    if (this.assetType.assetId !== other.assetType.assetId) {
      throw new Error('Cannot compare different asset types');
    }

    return this.valueAtomicUnits.gt(other.valueAtomicUnits);
  }

  gte (other) {
    if (this.assetType.assetId !== other.assetType.assetId) {
      throw new Error('Cannot compare different asset types');
    }

    return this.valueAtomicUnits.gte(other.valueAtomicUnits);
  }

  lt (other) {
    if (this.assetType.assetId !== other.assetType.assetId) {
      throw new Error('Cannot compare different asset types');
    }

    return this.valueAtomicUnits.lt(other.valueAtomicUnits);
  }

  lte (other) {
    if (this.assetType.assetId !== other.assetType.assetId) {
      throw new Error('Cannot compare different asset types');
    }

    return this.valueAtomicUnits.lte(other.valueAtomicUnits);
  }

  sub (other) {
    if (this.assetType.assetId !== other.assetType.assetId) {
      throw new Error('Cannot subtract different asset types');
    }

    const value = this.valueAtomicUnits.sub(other.valueAtomicUnits);

    return new Balance(this.assetType, value);
  }

  add (other) {
    if (this.assetType.assetId !== other.assetType.assetId) {
      throw new Error('Cannot add different asset types');
    }

    const value = this.valueAtomicUnits.add(other.valueAtomicUnits);

    return new Balance(this.assetType, value);
  }

  mul (num) {
    const value = this.valueAtomicUnits.mul(num);

    return new Balance(this.assetType, value);
  }

  div (num) {
    const value = this.valueAtomicUnits.div(num);

    return new Balance(this.assetType, value);
  }

  static max (a, b) {
    if (a.assetType.assetId !== b.assetType.assetId) {
      throw new Error('Cannot compare different asset types');
    }

    const value = BN.max(a.valueAtomicUnits, b.valueAtomicUnits);

    return new Balance(a.assetType, value);
  }
}
