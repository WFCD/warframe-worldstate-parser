'use strict';

const md = require('node-md-config');
const WorldstateObject = require('./WorldstateObject.js');
const utils = require('./utils.js');
const MissionDefault = require('./Mission.js');

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
class Alert extends WorldstateObject {
  /**
   * @param {Object} data The alert data
   * @param {Object} translator The string translator
   * @param {Object} [options] Parsing options
   * @param {Object} [options.translator] The string translator
   * @param {Object} [options.MissionParser] The Mission parser
   */
  constructor(data, { Mission = MissionDefault } = {}) {
    super(data);

    /**
     * The activation date and time
     * @type {Date}
     */
    this.activation = new Date(1000 * data.Activation.sec);

    /**
     * The expiry date and time
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.Expiry.sec);

    /**
     * The alert mission
     * @type {Mission}
     */
    this.mission = new Mission(data.MissionInfo);
  }

  /**
   * The alert's description
   * @readonly
   * @type {string}
   */
  get description() {
    return this.mission.description;
  }

  /**
   * The alert's reward
   * @readonly
   * @type {Reward}
   */
  get reward() {
    return this.mission.reward;
  }

  /**
   * The alert's ETA string
   * @readonly
   * @type {string}
   */
  get ETAString() {
    return utils.timeDeltaToString(this.expiry.getTime() - Date.now());
  }

  /**
   * The alert's reward types
   * @readonly
   * @type {Array.<string>}
   */
  get rewardTypes() {
    return this.reward.types;
  }

  /**
   * Whether or not this alert has expired
   * @readonly
   * @type {boolean}
   */
  get expired() {
    return this.expiry.getTime() < Date.now();
  }

  /**
   * The alert's string representation
   * @returns {string}
   */
  toString() {
    const lines = [
      this.mission.toString(),
      this.ETAString,
    ];

    return `${md.codeMulti}${lines.join(md.lineEnd)}${md.blockEnd}`;
  }
}

module.exports = Alert;
