import wsData from 'warframe-worldstate-data';

import mdConfig from '../supporting/MarkdownSettings.js';
import { fromNow, parseDate, timeDeltaToString } from '../utilities/timeDate.js';
import { languageString, sortieBoss, sortieFaction } from '../utilities/translation.js';

import WorldstateObject from './WorldstateObject.js';
import SortieVariant from './SortieVariant.js';
import Mission from './Mission.js';

const { sortie: sortieData } = wsData;

/**
 * Represents a daily sortie
 * @augments {WorldstateObject}
 */
export default class Sortie extends WorldstateObject {
  /**
   * @param   {object}            data               The data for all daily sorties
   * @param   {object}            deps               The dependencies object
   * @param {string} deps.locale Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    const opts = {
      mdConfig,
      sortieData,
      locale,
    };

    /**
     * The date and time at which the sortie starts
     * @type {Date}
     */
    this.activation = parseDate(data.Activation);

    /**
     * The date and time at which the sortie ends
     * @type {Date}
     */
    this.expiry = parseDate(data.Expiry);

    /**
     * The sortie's reward pool
     * @type {string}
     */
    this.rewardPool = languageString(data.Reward, locale);

    /**
     * The sortie's variants
     * @type {Array.<SortieVariant>}
     */
    this.variants = (data.Variants ?? []).map((v) => new SortieVariant(v, opts));

    this.missions = (data.Missions ?? []).map((v) => new Mission(v, opts));

    /**
     * The sortie's boss
     * @type {string}
     */
    this.boss = sortieBoss(data.Boss, locale);

    /**
     * The sortie's faction
     * @type {string}
     */
    this.faction = sortieFaction(data.Boss, locale);

    /**
     * The sortie's faction
     * @type {string}
     */
    this.factionKey = sortieFaction(data.Boss, 'en');

    /**
     * Whether this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.isExpired();

    /**
     * ETA string (at time of object creation)
     * @type {string}
     */
    this.eta = this.getETAString();
  }

  /**
   * Get the sortie's boss
   * @returns {string} the sortie's boss
   */
  getBoss() {
    return this.boss;
  }

  /**
   * Get the sortie's faction
   * @returns {string} the sortie's faction
   */
  getFaction() {
    return this.faction;
  }

  /**
   * Gets a string indicating how long it will take for the sortie to end
   * @returns {string} estimated time of arrival
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Get whether or not the sortie has expired
   * @returns {boolean} whether the sortie has expired
   */
  isExpired() {
    return fromNow(this.expiry) < 0;
  }

  /**
   * Returns the sortie's string representation
   * @returns {string} the string representation
   */
  toString() {
    if (this.isExpired()) {
      return `${mdConfig.codeBlock}There's currently no sortie${mdConfig.blockEnd}`;
    }

    const variantString = this.variants.map((v) => v.toString()).join('');

    return (
      `${mdConfig.codeBlock}${this.getBoss()}: ends in ${this.getETAString()}` +
      `${mdConfig.doubleReturn}${variantString}${mdConfig.blockEnd}`
    );
  }
}
