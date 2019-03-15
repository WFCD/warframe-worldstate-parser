'use strict';

const WorldstateObject = require('./WorldstateObject.js');

const repBase = 1000;

/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
class NightwaveChallenge extends WorldstateObject {
  /**
   * @param   {Object}             data            The alert data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {function}           deps.Mission    The Mission parser
   * @param   {function}           deps.Reward     The Reward parser
   */
  constructor(data, {
    translator, timeDate,
  }) {
    super(data, { timeDate });

    /**
     * Whether or not this is a daily challenge
     * @type {Boolean}
     */
    this.isDaily = data.Daily;

    /**
     * Whether or not the challenge is an elite challenge
     * @type {Boolean}
     */
    this.isElite = /hard/ig.test(data.Challenge);

    /**
     * The descriptor for this challenge
     * @type {string}
     */
    this.desc = translator.languageDesc(data.Challenge);

    /**
     * The title for this challenge
     * @type {string}
     */
    this.title = translator.languageString(data.Challenge);

    /**
     * Generated id from expiry, challenge string,
     *  and whether or not it has `[PH]` (designating placeholder text)
     * @type {string}
     */
    this.id = `${this.expiry.getTime()}${data.Challenge.split('/').slice(-1)[0].toLowerCase()}${this.desc.indexOf('[PH]') > -1 ? 0 : 1}`;

    /**
     * Reputation reward for ranking up in the Nightwave
     * @type {Number}
     */
    this.reputation = repBase + (!this.isDaily ? 2000 : 0) + (this.isElite ? 2000 : 0);
  }
}

module.exports = NightwaveChallenge;
