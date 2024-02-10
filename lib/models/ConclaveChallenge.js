import { parseDate, fromNow, timeDeltaToString } from '../utilities/timeDate.js';
import { conclaveMode, conclaveCategory, conclaveChallenge } from '../utilities/translation.js';

import WorldstateObject from './WorldstateObject.js';

/**
 * Represents a Conclave challenge
 * @augments {WorldstateObject}
 */
export default class ConclaveChallenge extends WorldstateObject {
  /**
   * @param   {object}             data            The challenge data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    /**
     * The time and date at which the challenge expires
     * @type {Date}
     */
    this.expiry = parseDate(data.endDate);

    /**
     * The time and date at which the challenge starts
     * @type {Date}
     */
    this.activation = parseDate(data.startDate);

    /**
     * The number of times that the challenge's objective needs to be completed
     * @type {number}
     */
    this.amount = data.params[0].v;

    /**
     * The PVP mode that the challenge must be completed in
     * @type {string}
     */
    this.mode = conclaveMode(data.PVPMode, locale);

    /**
     * The challenge's category (daily, weekly...)
     * @type {string}
     */
    this.category = conclaveCategory(data.Category, locale);

    /**
     * ETA string (at time of object creation)
     * @type {string}
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
     * @type {number}
     */
    this.standing = undefined;

    const challenge = conclaveChallenge(data.challengeTypeRefID, locale);

    ({ title: this.title, description: this.description, standing: this.standing } = challenge);

    /**
     * This challenge as a string
     * @type {string}
     */
    this.asString = this.toString();
  }

  /**
   * Get whether or not the challenge is daily
   * @returns {boolean} whether the category is daily
   */
  isDaily() {
    return this.category.toLowerCase() === 'day';
  }

  /**
   * Get whether or not this is the weekly root challenge
   * @returns {boolean} whether this is the root challenge
   */
  isRootChallenge() {
    return this.category.toLowerCase() === 'week_root';
  }

  /**
   * Get whether or not the challenge has expired
   * @returns {boolean} Whether or not the challenge has expired
   */
  isExpired() {
    return fromNow(this.expiry) < 0;
  }

  /**
   * Get a string indicating how much time is left before the challenge expires
   * @returns {string} The time left before the challenge expires
   */
  getEndString() {
    const timeDelta = fromNow(this.expiry);
    return timeDeltaToString(timeDelta);
  }

  /**
   * The conclave challenge's string representation
   * @returns {string} The string representation of the conclave challenge
   */
  toString() {
    return `${this.description} on ${this.mode} ${this.amount} times in a ${this.category}`;
  }
}
