'use strict';

const WorldstateObject = require('./WorldstateObject');
const ChallengeInstance = require('./ChallengeInstance');

/**
 * Represents a void trader
 * @extends {WorldstateObject}
 */
class WeeklyChallenge extends WorldstateObject {
  /**
   * @param   {Object}             data            The Void trader data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   */
  constructor(data, { timeDate, translator }) {
    super(data);

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    this.activation = timeDate.parseDate(data.Activation);

    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.Expiry);

    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    this.active = this.isActive();

    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    this.startString = this.getStartString();

    /**
     * A string indicating how long it will take for the trader to leave
     *  (at time of object creation)
     * @type {string}
     */
    this.endString = this.getEndString();

    this.challenges = data.Challenges.map(challengeData => new ChallengeInstance(challengeData, { translator }));
  }

  /**
   * Get whether or not the trader is currently active
   * @returns {boolean}
   */
  isActive() {
    return (this.timeDate.fromNow(this.activation) < 0) && (this.timeDate.fromNow(this.expiry) > 0);
  }

  /**
   * Get a string indicating how long it will take for the trader to arrive
   * @returns {string}
   */
  getStartString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.activation));
  }

  /**
   * Get a string indicating how long it will take for the trader to leave
   * @returns {string}
   */
  getEndString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the trader
   * @returns {string}
   */
  toString() {
    return `Starts: ${this.getStartString()}\nEnds: ${this.getEndString()}\nChallenges:\n${this.challenges.map(challenge => `\t${challenge.toString()}`).join('\n')}`;
  }
}

module.exports = WeeklyChallenge;
