'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a fissure mission
 * @extends {WorldstateObject}
 */
class Fissure extends WorldstateObject {
  /**
   * @param   {Object}             data            The fissure data
   * @param   {Object}             deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { translator, timeDate, locale }) {
    super(data, { timeDate });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The node where the fissure has appeared
     * @type {string}
     */
    this.node = translator.node(data.Node, locale);

    /**
     * The fissure mission type
     * @type {string}
     */
    this.missionType = translator.missionType(data.MissionType, locale);

    /**
     * The faction controlling the node where the fissure has appeared
     * @type {string}
     */
    this.enemy = translator.nodeEnemy(data.Node, locale);

    /**
     * The fissure's tier
     * @type {string}
     */
    this.tier = translator.fissureModifier(data.Modifier, locale);

    /**
     * The fissure's tier as a number
     * @type {number}
     */
    this.tierNum = translator.fissureTier(data.Modifier, locale);

    /**
     * The date and time at which the fissure appeared
     * @type {Date}
     */
    this.activation = timeDate.parseDate(data.Activation);

    /**
     * The date and time at which the fissure will disappear
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.Expiry);

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
  }

  /**
   * Get whether or not this deal has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * Get a string representation of how long the void fissure will remain active
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the fissure
   * @returns {string}
   */
  toString() {
    return `[${this.getETAString()}] ${this.tier} fissure at ${this.node} - ${this.enemy} ${this.missionType}`;
  }
}

module.exports = Fissure;
