'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
class Alert extends WorldstateObject {
  /**
   * @param   {Object}             data            The alert data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {function}           deps.Mission    The Mission parser
   * @param   {function}           deps.Reward     The Reward parser
   */
  constructor(data, { mdConfig, translator, timeDate, Mission, Reward }) {
    super(data, { timeDate });

    const deps = { mdConfig, translator, timeDate, Mission, Reward };

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
     * The mission that the players have to complete
     * @type {Mission}
     */
    this.mission = new Mission(data.MissionInfo, deps);

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();

    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    this.rewardTypes = this.getRewardTypes().length ? this.getRewardTypes() : ['credits'] ;
  }

  /**
   * Get the alert's description text
   * @returns {string}
   */
  getDescription() {
    return this.mission.description;
  }

  /**
   * Get the alert's reward
   * @returns {Reward}
   */
  getReward() {
    return this.mission.reward;
  }

  /**
   * Get a string indicating how much time is left before the alert expires
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Get an array containing the types of all of the alert's rewards
   * @returns {Array.<string>}
   */
  getRewardTypes() {
    return this.mission.reward.getTypes();
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
