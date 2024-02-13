import { languageDesc, languageString } from 'warframe-worldstate-data/utilities';

import WorldstateObject from './WorldstateObject.js';

const repBase = 1000;

/**
 * Represents an alert
 * @augments {WorldstateObject}
 */
export default class NightwaveChallenge extends WorldstateObject {
  /**
   * @param   {object}             data            The alert data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    /**
     * Whether or not this is a daily challenge
     * @type {boolean}
     */
    this.isDaily = data.Daily || false;

    /**
     * Whether or not the challenge is an elite challenge
     * @type {boolean}
     */
    this.isElite = /hard/gi.test(data.Challenge);

    /**
     * The descriptor for this challenge
     * @type {string}
     */
    this.desc = languageDesc(data.Challenge, locale);

    /**
     * The title for this challenge
     * @type {string}
     */
    this.title = languageString(data.Challenge, locale);

    /**
     * Generated id from expiry, challenge string,
     *  and whether or not it has `[PH]` (designating placeholder text)
     * @type {string}
     */
    this.id = `${this.expiry.getTime()}${data.Challenge.split('/').slice(-1)[0].toLowerCase()}`;

    /**
     * Reputation reward for ranking up in the Nightwave
     * @type {number}
     */
    this.reputation = repBase + (!this.isDaily ? 3500 : 0) + (this.isElite ? 2500 : 0);

    /**
     * Whether this challenge is permanent
     * @type {boolean}
     */
    this.isPermanent = Boolean(data?.Permanent);
  }
}
