'use strict';

const WorldstateObject = require('./WorldstateObject');

/**
 * Represents a daily sortie
 * @extends {WorldstateObject}
 */
class Sortie extends WorldstateObject {
  /**
   * @param   {Object}            data               The data for all daily sorties
   * @param   {Object}            deps               The dependencies object
   * @param   {MarkdownSettings}  mdConfig      The markdown settings
   * @param   {Translator}        translator    The string translator
   * @param   {TimeDateFunctions} timeDate      The time and date functions
   * @param   {Object}            sortieData    The data used to parse sorties
   * @param   {SortieVariant}     SortieVariant The sortie variant parser
   * @param   {string}            locale        Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, sortieData, SortieVariant, locale, Mission }) {
    super(data, { timeDate });

    const opts = {
      mdConfig,
      translator,
      timeDate,
      sortieData,
      SortieVariant,
      locale,
    };

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The date and time at which the sortie starts
     * @type {Date}
     */
    this.activation = timeDate.parseDate(data.Activation);

    /**
     * The date and time at which the sortie ends
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.Expiry);

    /**
     * The sortie's reward pool
     * @type {string}
     */
    this.rewardPool = translator.languageString(data.Reward, locale);

    /**
     * The sortie's variants
     * @type {Array.<SortieVariant>}
     */
    this.variants = (data.Variants || []).map((v) => new SortieVariant(v, opts));

    this.missions = (data.Missions || []).map((v) => new Mission(v, opts));

    /**
     * The sortie's boss
     * @type {string}
     */
    this.boss = translator.sortieBoss(data.Boss, locale);

    /**
     * The sortie's faction
     * @type {string}
     */
    this.faction = translator.sortieFaction(data.Boss, locale);

    /**
     * The sortie's faction
     * @type {string}
     */
    this.factionKey = translator.sortieFaction(data.boss, 'en');

    /**
     * Whether this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.isExpired();

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();
  }

  /**
   * Get the sortie's boss
   * @returns {string}
   */
  getBoss() {
    return this.boss;
  }

  /**
   * Get the sortie's faction
   * @returns {string}
   */
  getFaction() {
    return this.faction;
  }

  /**
   * Gets a string indicating how long it will take for the sortie to end
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Get whether or not the sortie has expired
   * @returns {boolean}
   */
  isExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * Returns the sortie's string representation
   * @returns {string}
   */
  toString() {
    if (this.isExpired()) {
      return `${this.mdConfig.codeMulti}There's currently no sortie${this.mdConfig.lineEnd}${this.mdConfig.blockEnd}`;
    }

    const variantString = this.variants.map((v) => v.toString()).join('');

    return (
      `${this.mdConfig.codeMulti}${this.getBoss()}: ends in ${this.getETAString()}` +
      `${this.mdConfig.doubleReturn}${variantString}${this.mdConfig.blockEnd}`
    );
  }
}

module.exports = Sortie;
