import {
  parseDate,
  fromNow,
  timeDeltaToString,
  upgrade,
  operation,
  operationSymbol,
} from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';
import Dependency from '../supporting/Dependency.js';
import { ContentTimestamp } from './WorldstateObject.js';

export interface RawGlobalUpgrade {
  Activation: ContentTimestamp;
  ExpiryDate: ContentTimestamp;
  UpgradeType: string;
  OperationType: string;
  Value: number;
}

/**
 * Represents an upgrade that applies to all players
 */
export default class GlobalUpgrade {
  /**
   * The time and date at which the global upgrade starts being active
   */
  activation: Date;

  /**
   * @deprecated Use `activation` instead
   */
  start: any;

  /**
   * The time and date at which the global upgrade stops being active
   */
  expiry: Date;
  /**
   * @deprecated Use `expiry` instead
   */
  end: Date;

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
   * Whether or not this is expired (at time of object creation)
   */
  expired: boolean;

  /**
   * ETA string (at time of object creation)
   */
  eta: string;

  /**
   * Plaintext description of upgrade
   */
  desc: string;

  /**
   * @param   {object}             data            The global upgrade data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawGlobalUpgrade, { locale = 'en' }: Dependency = { locale: 'en' }) {
    if (!data.Activation || !data.ExpiryDate) {
      throw new TypeError('The provided data does not have the required properties.');
    }

    this.activation = parseDate(data.Activation);

    this.start = this.activation;

    this.expiry = parseDate(data.ExpiryDate);

    this.end = this.expiry;

    this.upgrade = upgrade(data.UpgradeType, locale);

    this.operation = operation(data.OperationType, locale);

    this.operationSymbol = operationSymbol(data.OperationType, locale);

    this.upgradeOperationValue = data.Value;

    this.expired = this.getExpired();

    this.eta = this.getETAString();

    this.desc = this.compileDesription();
  }

  /**
   * Get whether or not the event has expired
   */
  getExpired(): boolean {
    return fromNow(this.expiry) < 0;
  }

  /**
   * Get a string indicating how long it will take for the upgrade to expire
   */
  getETAString(): string {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Turn the global upgrade into a plain text description
   */
  compileDesription(): string {
    return `${this.upgradeOperationValue}${this.operationSymbol} ${this.upgrade} for ${this.eta}`;
  }

  /**
   * Returns a string representation of the upgrade
   */
  toString(): string {
    return (
      `${mdConfig.codeBlock}[${this.getETAString()}] ${this.upgrade}` +
      `${this.operation} ${this.upgradeOperationValue}${mdConfig.blockEnd}`
    );
  }
}
