import WorldstateObject from './WorldstateObject.js';

import mdConfig from '../supporting/MarkdownSettings.js';
import { fromNow, timeDeltaToString } from '../utilities/timeDate.js';
import Mission from './Mission.js';

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
export default class Alert extends WorldstateObject {
  /**
   * @param   {Object}             data       The alert data
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
     * @type {String}
     */
    this.eta = this.getETAString();

    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    this.rewardTypes = this.getRewardTypes().length ? this.getRewardTypes() : ['credits'];

    /**
     * A tag that DE occasionally provides, such as `LotusGift`
     * @type {String}
     */
    this.tag = data.Tag || undefined;
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
    return timeDeltaToString(fromNow(this.expiry));
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
    const lines = [this.mission.toString(), this.getETAString()];

    return `${mdConfig.codeBlock}${lines.join(mdConfig.lineEnd)}${mdConfig.blockEnd}`;
  }
}
