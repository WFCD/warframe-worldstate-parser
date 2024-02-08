import WorldstateObject from './WorldstateObject.js';
import NightwaveChallenge from './NightwaveChallenge.js';
import { languageString } from '../utilities/translation.js';
import { fromNow, timeDeltaToString } from '../utilities/timeDate.js';

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
export default class Nightwave extends WorldstateObject {
  /**
   * @param   {Object}             data            The alert data
   * @param   {Object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    this.id = `nightwave${new Date(this.expiry).getTime()}`;

    const deps = {
      locale,
    };

    /**
     * The current season. 0-indexed.
     * @type {Number}
     */
    this.season = data.Season;

    /**
     * Descriptor for affiliation
     * @type {string}
     */
    this.tag = languageString(data.AffiliationTag, locale);

    /**
     * The current season's current phase. 0-indexed.
     * @type {Number}
     */
    this.phase = data.Phase;

    /**
     * Misc params provided.
     * @type {Object}
     */
    this.params = JSON.parse(data.Params || '{}');

    this.possibleChallenges = (data.Challenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);

    this.activeChallenges = (data.ActiveChallenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);

    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    this.rewardTypes = this.getRewardTypes().length ? this.getRewardTypes() : ['credits'];
  }

  /**
   * Get a string indicating how much time is left before the alert expires
   * @returns {string}
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Get an array containing the types of all of the nightwave season's rewards
   * @returns {Array.<string>}
   */
  // eslint-disable-next-line class-methods-use-this
  getRewardTypes() {
    return [];
  }

  /**
   * The alert's string representation
   * @returns {string}
   */
  // eslint-disable-next-line class-methods-use-this
  toString() {
    return '';
  }
}
