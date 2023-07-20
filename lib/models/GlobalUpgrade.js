'use strict';

/**
 * Represents an upgrade that applies to all players
 */
class GlobalUpgrade {
  /**
   * @param   {Object}             data            The global upgrade data
   * @param   {Object}             deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { translator, timeDate, mdConfig, locale }) {
    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The time and date at which the global upgrade starts being active
     * @type {Date}
     */
    this.start = timeDate.parseDate(data.Activation);

    /**
     * The time and date at which the global upgrade stops being active
     * @type {Date}
     */
    this.end = timeDate.parseDate(data.ExpiryDate);

    /**
     * The effect of the upgrade
     * @type {string}
     */
    this.upgrade = translator.upgrade(data.UpgradeType, locale);

    /**
     * The operation type
     * @type {string}
     */
    this.operation = translator.operation(data.OperationType, locale);

    /**
     * Symbol for operation
     * @type {string}
     */
    this.operationSymbol = translator.operationSymbol(data.OperationType, locale);

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
     * @type {String}
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
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.end) < 0;
  }

  /**
   * Get a string indicating how long it will take for the upgrade to expire
   * @returns {string}
   */
  getETAString() {
    const timeDelta = this.timeDate.fromNow(this.end);
    return this.timeDate.timeDeltaToString(timeDelta);
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
   * @returns {string}
   */
  toString() {
    return (
      `${this.mdConfig.codeMulti}[${this.getETAString()}] ${this.upgrade}` +
      `${this.operation} ${this.upgradeOperationValue}${this.mdConfig.blockEnd}`
    );
  }
}

module.exports = GlobalUpgrade;
