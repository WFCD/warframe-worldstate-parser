import WorldstateObject from './WorldstateObject.js';
import ChallengeInstance from './ChallengeInstance.js';

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
    super(data, { timeDate });

    this.challenges = data.Challenges
      .map((challengeData) => new ChallengeInstance(challengeData, { translator }));
  }

  /**
   * Returns a string representation of the trader
   * @returns {string}
   */
  toString() {
    return `Starts: ${this.getStartString()}\nEnds: ${this.getEndString()}\nChallenges:\n${this.challenges.map((challenge) => `\t${challenge.toString()}`).join('\n')}`;
  }
}

export default WeeklyChallenge;
