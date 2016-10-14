'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a Conclave challenge
 */
class ConclaveChallenge extends WorldstateObject {
  /**
   * @param   {Object} data                 The challenge data
   * @param   {Object} options.translator The string translator
   * @param   {Object} options.mdConfig   The markdown settings
   * @param   {Object} options.timeDate   The time and date functions
   */
  constructor(data, { translator, mdConfig, timeDate }) {
    super(data);

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * Time and date functions
     * @type {Object}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The challenge description
     * @type {string}
     */
    this.description = translator.languageString(data.challengeTypeRefID);

    /**
     * The expiry date and time
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.endDate.sec);

    /**
     * The number of times that the objective needs to be completed
     * @type {number}
     */
    this.amount = data.params[0].v;

    /**
     * The PVP mode the challenge must be completed in
     * @type {string}
     */
    this.mode = translator.conclaveMode(data.PVPMode);

    /**
     * The challenge category (daily, weekly...)
     * @type {string}
     */
    this.category = translator.conclaveCategory(data.Category);
  }

  /**
   * Whether or not the challenge is daily
   * @returns {boolean}
   */
  isDaily() {
    return this.category.toLowerCase() === 'day';
  }

  /**
   * Whether or not this is the weekly root challenge
   * @returns {boolean}
   */
  isRootChallenge() {
    return this.category.toLowerCase() === 'week_root';
  }

  /**
   * Whether or not the challenge is expired
   * @returns {boolean}
   */
  isExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * Returns a string indicating how much time is left before the challenge expires
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
