import {
  parseDate,
  fromNow,
  timeDeltaToString,
  upgrade,
  operation,
  operationSymbol,
} from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';
/**
 * Represents an upgrade that applies to all players
 */
export default class GlobalUpgrade {
  /**
   * @param   {object}             data            The global upgrade data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    if (!data.Activation || !data.ExpiryDate) {
      throw new TypeError('The provided data does not have the required properties.');
    }
    /**
     * The time and date at which the global upgrade starts being active
     * @type {Date}
     */
    this.start = parseDate(data.Activation);

    /**
     * The time and date at which the global upgrade stops being active
     * @type {Date}
     */
    this.end = parseDate(data.ExpiryDate);

    /**
     * The effect of the upgrade
     * @type {string}
     */
    this.upgrade = upgrade(data.UpgradeType, locale);

    /**
     * The operation type
     * @type {string}
     */
    this.operation = operation(data.OperationType, locale);

    /**
     * Symbol for operation
     * @type {string}
     */
    this.operationSymbol = operationSymbol(data.OperationType, locale);

    /**
     * The operation value
     * @type {string}
     */
    this.upgradeOperationValue = data.Value;

    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.getExpired();

    /**
     * ETA string (at time of object creation)
     * @type {string}
     */
    this.eta = this.getETAString();

    /**
     * Plaintext description of upgrade
     * @type {string}
     */
    this.desc = this.compileDesription();
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean} whether the event has expired
   */
  getExpired() {
    return fromNow(this.end) < 0;
  }

  /**
   * Get a string indicating how long it will take for the upgrade to expire
   * @returns {string} estimated timer of the upgrade
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.end));
  }

  /**
   * Turn the global upgrade into a plain text description
   * @returns {string} Descriptio
   */
  compileDesription() {
    return `${this.upgradeOperationValue}${this.operationSymbol} ${this.upgrade} for ${this.eta}`;
  }

  /**
   * Returns a string representation of the upgrade
   * @returns {string} string representation
   */
  toString() {
    return (
      `${mdConfig.codeBlock}[${this.getETAString()}] ${this.upgrade}` +
      `${this.operation} ${this.upgradeOperationValue}${mdConfig.blockEnd}`
    );
  }
}
