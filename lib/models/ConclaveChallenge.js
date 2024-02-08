import WorldstateObject from './WorldstateObject.js';
import { parseDate, fromNow, timeDeltaToString } from '../utilities/timeDate.js';
import { conclaveMode, conclaveCategory, conclaveChallenge } from '../utilities/translation.js';

/**
 * Represents a Conclave challenge
 * @extends {WorldstateObject}
 */
export default class ConclaveChallenge extends WorldstateObject {
  /**
   * @param   {Object}             data            The challenge data
   * @param   {Object}             deps            The dependencies object
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
    return fromNow(this.expiry) < 0;
  }

  /**
   * Get a string indicating how much time is left before the challenge expires
   * @returns {string}
   */
  getEndString() {
    const timeDelta = fromNow(this.expiry);
    return timeDeltaToString(timeDelta);
  }

  /**
   * The conclave challenge's string representation
   * @returns {string}
   */
  toString() {
    return `${this.description} on ${this.mode} ${this.amount} times in a ${this.category}`;
  }
}
