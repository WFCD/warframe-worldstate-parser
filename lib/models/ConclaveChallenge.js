'use strict';

const WorldstateObject = require('./WorldstateObject');

/**
 * Represents a Conclave challenge
 * @extends {WorldstateObject}
 */
class ConclaveChallenge extends WorldstateObject {
  /**
   * @param   {Object}             data            The challenge data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, locale }) {
    super(data, { timeDate });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * Time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The time and date at which the challenge expires
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.endDate);

    /**
     * The time and date at which the challenge starts
     * @type {Date}
     */
    this.activation = timeDate.parseDate(data.startDate);

    /**
     * The number of times that the challenge's objective needs to be completed
     * @type {number}
     */
    this.amount = data.params[0].v;

    /**
     * The PVP mode that the challenge must be completed in
     * @type {string}
     */
    this.mode = translator.conclaveMode(data.PVPMode, locale);

    /**
     * The challenge's category (daily, weekly...)
     * @type {string}
     */
    this.category = translator.conclaveCategory(data.Category, locale);

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getEndString();

    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.isExpired();

    /**
     * Whether or not this is a daily conclave challenge.
     * @type {boolean}
     */
    this.daily = this.isDaily();

    /**
     * Whether or not this is the root challenge
     * @type {boolean}
     */
    this.rootChallenge = this.isRootChallenge();

    /**
     * the end string
     * @type {string}
     */
    this.endString = this.getEndString();

    /**
     * The challenge's description text
     * @type {string}
     */
    this.description = undefined;

    /**
     * Title of the challenge
     * @type {string}
     */
    this.title = undefined;

    /**
     * Standing granted by completing challenge.
     * @type {Number}
     */
    this.standing = undefined;

    const challenge = translator.conclaveChallenge(data.challengeTypeRefID, locale);

    ({ title: this.title, description: this.description, standing: this.standing } = challenge);

    /**
     * This challenge as a string
     * @type {string}
     */
    this.asString = this.toString();
  }

  /**
   * Get whether or not the challenge is daily
   * @returns {boolean}
   */
  isDaily() {
    return this.category.toLowerCase() === 'day';
  }

  /**
   * Get whether or not this is the weekly root challenge
   * @returns {boolean}
   */
  isRootChallenge() {
    return this.category.toLowerCase() === 'week_root';
  }

  /**
   * Get whether or not the challenge has expired
   * @returns {boolean}
   */
  isExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * Get a string indicating how much time is left before the challenge expires
   * @returns {string}
   */
  getEndString() {
    const timeDelta = this.timeDate.fromNow(this.expiry);
    return this.timeDate.timeDeltaToString(timeDelta);
  }

  /**
   * The conclave challenge's string representation
   * @returns {string}
   */
  toString() {
    return `${this.description} on ${this.mode} ${this.amount} times in a ${this.category}`;
  }
}

module.exports = ConclaveChallenge;
