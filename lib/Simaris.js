'use strict';

/**
 * Contains information about sanctuary targets
 */
class Simaris {
  /**
   * @param   {Object}             data            The sanctuary data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   */
  constructor(data, { mdConfig, translator }) {
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The sanctuary target
     * @type {string}
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
