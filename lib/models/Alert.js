import mdConfig from '../supporting/MarkdownSettings.js';
import { fromNow, timeDeltaToString } from '../utilities/timeDate.js';

import WorldstateObject from './WorldstateObject.js';
import Mission from './Mission.js';

/**
 * Represents an alert
 * @augments {WorldstateObject}
 */
export default class Alert extends WorldstateObject {
  /**
   * @param   {object}             data       The alert data
   * @param   {string}             locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    const deps = {
      locale,
    };

    /**
     * The mission that the players have to complete
     * @type {Mission}
     */
    this.mission = new Mission(data.MissionInfo, deps);

    /**
     * ETA string (at time of object creation)
     * @type {string}
     */
    this.eta = this.getETAString();

    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    this.rewardTypes = this.getRewardTypes().length ? this.getRewardTypes() : ['credits'];

    /**
     * A tag that DE occasionally provides, such as `LotusGift`
     * @type {string}
     */
    this.tag = data.Tag || undefined;
  }

  /**
   * Get the alert's description text
   * @returns {string} the description
   */
  getDescription() {
    return this.mission.description;
  }

  /**
   * Get the alert's reward
   * @returns {Reward} the reward
   */
  getReward() {
    return this.mission.reward;
  }

  /**
   * Get a string indicating how much time is left before the alert expires
   * @returns {string} the time left
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Get an array containing the types of all of the alert's rewards
   * @returns {Array.<string>} an array containing the types of all of the alert's rewards
   */
  getRewardTypes() {
    return this.mission.reward.getTypes();
  }

  /**
   * The alert's string representation
   * @returns {string} the string representation
   */
  toString() {
    const lines = [this.mission.toString(), this.getETAString()];

    return `${mdConfig.codeBlock}${lines.join(mdConfig.lineEnd)}${mdConfig.blockEnd}`;
  }
}
