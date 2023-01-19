'use strict';

const WorldstateObject = require('./WorldstateObject');

const repBase = 1000;

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
class NightwaveChallenge extends WorldstateObject {
  /**
   * @param   {Object}             data            The alert data
   * @param   {Object}             deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { translator, timeDate, locale }) {
    super(data, { timeDate });

    /**
     * Whether or not this is a daily challenge
     * @type {Boolean}
     */
    this.isDaily = data.Daily || false;

    /**
     * Whether or not the challenge is an elite challenge
     * @type {Boolean}
     */
    this.isElite = /hard/gi.test(data.Challenge);

    /**
     * The descriptor for this challenge
     * @type {string}
     */
    this.desc = translator.languageDesc(data.Challenge, locale);

    /**
     * The title for this challenge
     * @type {string}
     */
    this.title = translator.languageString(data.Challenge, locale);

    /**
     * Generated id from expiry, challenge string,
     *  and whether or not it has `[PH]` (designating placeholder text)
     * @type {string}
     */
    this.id = `${this.expiry.getTime()}${data.Challenge.split('/').slice(-1)[0].toLowerCase()}`;

    /**
     * Reputation reward for ranking up in the Nightwave
     * @type {Number}
     */
    this.reputation = repBase + (!this.isDaily ? 3500 : 0) + (this.isElite ? 2500 : 0);
  }
}

module.exports = NightwaveChallenge;
