'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a daily sortie
 */
class Sortie extends WorldstateObject {
  /**
   * @param   {Object}   data                  The data for all daily sorties
   * @param   {Object}   options.sortieData    The data used to parse sorties
   * @param   {Object}   options.translator    The string translator
   * @param   {function} options.SortieVariant The sortie variant parser
   * @param   {Object}   options.mdConfig      The markdown settings
   * @param   {Object}   options.timeDate      The time and date functions
   */
  constructor(data, { sortieData, translator, SortieVariant, mdConfig, timeDate }) {
    super(data);

    const opts = { sortieData, translator, SortieVariant, mdConfig, timeDate };

    /**
     * The time and date functions
     * @type {Object}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The date and time at which the sortie starts
     * @type {Date}
     */
    this.activation = new Date(1000 * data.Activation.sec);

    /**
     * The date and time at which the sortie ends
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.Expiry.sec);

    /**
     * The sortie's reward pool
     * @type {string}
     */
    this.rewardPool = translator.languageString(data.Reward);

    /**
     * The sortie variants
     * @type {Array.<SortieVariant>}
     */
    this.variants = data.Variants.map(v => new SortieVariant(v, opts));
  }

  /**
   * Returns the sortie's boss
   * @returns {string}
   */
  getBoss() {
    return this.variants[0].boss;
  }

  /**
   * Returns the sortie's faction
   * @returns {string}
   */
  getFaction() {
    return this.variants[0].faction;
  }

  /**
   * Returns a string indicating how long it will take for the sortie to expire
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Whether or not the sortie has expired
   * @returns {boolean}
   */
  isExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  toString() {
    if (this.isExpired()) {
      return `${this.mdConfig.codeMulti}There's currently no sortie${this.mdConfig.lineEnd}` +
        `${this.mdConfig.blockEnd}`;
    }

    const variantString = this.variants.map(v => v.toString()).join('');

    return `${this.mdConfig.codeMulti}${this.getBoss()}: ends in ${this.getETAString()}` +
      `${this.mdConfig.doubleReturn}${variantString}${this.mdConfig.blockEnd}`;
  }
}

module.exports = Sortie;
