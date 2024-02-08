import {
  node,
  nodeMissionType,
  missionType,
  nodeEnemy,
  fissureModifier,
  fissureTier,
} from '../utilities/translation.js';
import { parseDate, fromNow, timeDeltaToString } from '../utilities/timeDate.js';

import WorldstateObject from './WorldstateObject.js';

/**
 * Represents a fissure mission
 * @augments {WorldstateObject}
 */
export default class Fissure extends WorldstateObject {
  /**
   * @param   {object}             data            The fissure data
   * @param   {Dependency}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    /**
     * The node where the fissure has appeared
     * @type {string}
     */
    this.node = node(data.Node, locale);

    /**
     * The fissure mission type
     * @type {string}
     */
    this.missionType = data.MissionType ? missionType(data.MissionType, locale) : nodeMissionType(data.Node, locale);

    /**
     * The fissure mission type key
     * @type {string}
     */
    this.missionKey = data.MissionType ? missionType(data.MissionType) : nodeMissionType(data.Node);

    /**
     * The faction controlling the node where the fissure has appeared
     * @type {string}
     */
    this.enemy = nodeEnemy(data.Node, locale);

    /**
     * Faction enum for the faction controlling the node where the fissure has appeared
     * @type {string}
     */
    this.enemyKey = nodeEnemy(data.Node);

    /**
     * The node key where the fissure has appeared
     * @type {string}
     */
    this.nodeKey = node(data.Node);

    /**
     * The fissure's tier
     * @type {string}
     */
    this.tier = fissureModifier(data.Modifier || data.ActiveMissionTier, locale);

    /**
     * The fissure's tier as a number
     * @type {number}
     */
    this.tierNum = fissureTier(data.Modifier || data.ActiveMissionTier, locale);

    /**
     * The date and time at which the fissure appeared
     * @type {Date}
     */
    this.activation = parseDate(data.Activation);

    /**
     * The date and time at which the fissure will disappear
     * @type {Date}
     */
    this.expiry = parseDate(data.Expiry);

    /**
     * Whether this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.getExpired();

    /**
     * ETA string (at time of object creation)
     * @type {string}
     */
    this.eta = this.getETAString();

    /**
     * Whether this fissure corresponds to a RailJack Void Storm
     * @type {boolean}
     */
    this.isStorm = Boolean(data.ActiveMissionTier);

    /**
     * Whether this fissure is a Steel Path fissure
     * @type {boolean}
     */
    this.isHard = Boolean(data.Hard);
  }

  /**
   * Get whether this deal has expired
   * @returns {boolean}
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
  }

  /**
   * Get a string representation of how long the void fissure will remain active
   * @returns {string}
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the fissure
   * @returns {string}
   */
  toString() {
    return `[${this.getETAString()}] ${this.tier} fissure at ${this.node} - ${this.enemy} ${this.missionType}`;
  }
}
