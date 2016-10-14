'use strict';

/**
 * Contains information about sanctuary targets
 */
class Simaris {
  constructor(data, { mdConfig, translator }) {
    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The sanctuary target
     * @type {[type]}
     */
    this.target = translator.languageString(data.LastCompletedTargetType) || 'N/a';

    /**
     * Whether or not the target is currently active
     * @type {Boolean}
     */
    this.isTargetActive = !(data.LastCompletedTargetType);
  }

  /**
   * Returns a string representation of the current sanctuary status
   * @returns {string}
   */
  toString() {
    return `Simaris\'s ${this.isTargetActive ? 'current' : 'previous'} objective ` +
      `${this.isTargetActive ? 'is' : 'was'} ${this.target}`;
  }
}

module.exports = Simaris;
