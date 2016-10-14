'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
class Alert extends WorldstateObject {
  /**
   * @param {Object} data The alert data
   * @param {Object} opts.translator The string translator
   * @param {Object} opts.timeDate The time and date functions
   * @param {Object} opts.Mission  The Mission parser
   * @param {Object} opts.mdConfig The markdown settings
   */
  constructor(data, { translator, timeDate, Mission, Reward, mdConfig }) {
    super(data);

    const opts = { translator, timeDate, Mission, Reward, mdConfig };

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The time and date functions
     * @type {Object}
     * @private
     */
    this.timeDate = timeDate;

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
    this.mission = new Mission(data.MissionInfo, opts);
  }

  /**
   * The alert's description
   * @returns {string}
   */
  getDescription() {
    return this.mission.description;
  }

  /**
   * The alert's reward
   * @returns {Reward}
   */
  getReward() {
    return this.mission.reward;
  }

  /**
   * The alert's ETA string
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * The alert's reward types
   * @returns {Array.<string>}
   */
  getRewardTypes() {
    return this.reward.types;
  }

  /**
   * Whether or not this alert has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * The alert's string representation
   * @returns {string}
   */
  toString() {
    const lines = [
      this.mission.toString(),
      this.getETAString(),
    ];

    return `${this.mdConfig.codeMulti}${lines.join(this.mdConfig.lineEnd)}${this.mdConfig.blockEnd}`;
  }
}

module.exports = Alert;
