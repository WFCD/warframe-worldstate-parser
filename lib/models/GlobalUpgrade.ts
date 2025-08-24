import {
  type ContentTimestamp,
  fromNow,
  operation,
  operationSymbol,
  timeDeltaToString,
  upgrade
} from 'warframe-worldstate-data/utilities';

import type Dependency from '../supporting/Dependency.js';
import WorldstateObject, { type BaseContentObject } from './WorldstateObject.js';

export interface RawGlobalUpgrade extends BaseContentObject {
  Activation: ContentTimestamp;
  Expiry: ContentTimestamp;
  UpgradeType: string;
  OperationType: string;
  Value: number;
}

/**
 * Represents an upgrade that applies to all players
 */
export default class GlobalUpgrade extends WorldstateObject {
  /**
   * The effect of the upgrade
   */
  upgrade: string;

  /**
   * The operation type
   */
  operation: string;

  /**
   * Symbol for operation
   */
  operationSymbol: string;

  /**
   * The operation value
   */
  upgradeOperationValue: number;

  /**
   * @param   {object}             data            The global upgrade data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawGlobalUpgrade, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    this.upgrade = upgrade(data.UpgradeType, locale);
    this.operation = operation(data.OperationType, locale);
    this.operationSymbol = operationSymbol(data.OperationType, locale);
    this.upgradeOperationValue = data.Value;
  }

  /**
   * Plaintext description of upgrade
   */
  get desc(): string {
    return `${this.upgradeOperationValue}${this.operationSymbol} ${this.upgrade} for ${this.eta}`;
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }

  /**
   * Whether or not this is expired (at time of object creation)
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }
}
