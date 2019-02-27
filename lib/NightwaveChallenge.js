'use strict';

const WorldstateObject = require('./WorldstateObject.js');

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
     * The descriptor for this challenge
     * @type {string}
     */
    this.desc = translator.languageString(data.Challenge);
  }
}

module.exports = NightwaveChallenge;
