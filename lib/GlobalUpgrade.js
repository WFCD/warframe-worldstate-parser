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
   */
  constructor(data, { translator, timeDate }) {
    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The time and date at which the global upgrade starts being active
     * @type {Date}
     */
    this.start = new Date(1000 * data.Activation.sec);

    /**
     * The time and date at which the global upgrade stops being active
     * @type {Date}
     */
    this.end = new Date(1000 * data.ExpiryDate.sec);

    /**
     * The effect of the upgrade
     * @type {string}
     */
    this.upgrade = translator.upgrade(data.UpgradeType);

    /**
     * The operation type
     * @type {string}
     */
    this.operation = translator.operation(data.OperationType);

    /**
     * The operation value
     */
    this.upgradeOperationValue = data.Value;
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
   * Returns a string representation of the upgrade
   * @returns {string}
   */
  toString() {
    return `${this.mdConfig.codeMulti}[${this.getETAString()}] ${this.upgrade}` +
      `${this.operation} ${this.upgradeOperationValue}${this.mdConfig.blockEnd}`;
  }
}

module.exports = GlobalUpgrade;
