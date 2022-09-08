'use strict';

const WorldstateObject = require('./WorldstateObject');

/**
 * Represents a fissure mission
 * @extends {WorldstateObject}
 */
module.exports = class Fissure extends WorldstateObject {
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
    this.missionType = data.MissionType
      ? translator.missionType(data.MissionType, locale)
      : translator.nodeMissionType(data.Node, locale);

    /**
     * The fissure mission type key
     * @type {string}
     */
    this.missionKey = data.MissionType
      ? translator.missionType(data.MissionType)
      : translator.nodeMissionType(data.Node);

    /**
     * The faction controlling the node where the fissure has appeared
     * @type {string}
     */
    this.enemy = translator.nodeEnemy(data.Node, locale);

    /**
     * Faction enum for the faction controlling the node where the fissure has appeared
     * @type {string}
     */
    this.enemyKey = translator.nodeEnemy(data.Node);

    /**
     * The node key where the fissure has appeared
     * @type {string}
     */
    this.nodeKey = translator.node(data.Node);

    /**
     * The fissure's tier
     * @type {string}
     */
    this.tier = translator.fissureModifier(data.Modifier || data.ActiveMissionTier, locale);

    /**
     * The fissure's tier as a number
     * @type {number}
     */
    this.tierNum = translator.fissureTier(data.Modifier || data.ActiveMissionTier, locale);

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
     * Whether this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.getExpired();

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();

    /**
     * Whether this fissure corresponds to a RailJack Void Storm
     * @type {Boolean}
     */
    this.isStorm = !!data.ActiveMissionTier;

    /**
     * Whether this fissure is a Steel Path fissure
     * @type {boolean}
     */
    this.isHard = !!data.Hard;
  }

  /**
   * Get whether this deal has expired
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
};
