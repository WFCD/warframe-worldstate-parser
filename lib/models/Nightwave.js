'use strict';

const WorldstateObject = require('./WorldstateObject');
const NightwaveChallenge = require('./NightwaveChallenge');

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
class Nightwave extends WorldstateObject {
  /**
   * @param   {Object}             data            The alert data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {Mission}            deps.Mission    The Mission parser
   * @param   {Reward}             deps.Reward     The Reward parser
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, Mission, Reward, locale }) {
    super(data, { timeDate });

    this.id = `nightwave${new Date(this.expiry).getTime()}`;

    const deps = {
      mdConfig,
      translator,
      timeDate,
      Mission,
      Reward,
      locale,
    };

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
     * The current season. 0-indexed.
     * @type {Number}
     */
    this.season = data.Season;

    /**
     * Descriptor for affiliation
     * @type {string}
     */
    this.tag = translator.languageString(data.AffiliationTag, locale);

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
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
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

module.exports = Nightwave;
