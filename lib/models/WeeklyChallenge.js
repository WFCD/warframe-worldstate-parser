import WorldstateObject from './WorldstateObject.js';
import ChallengeInstance from './ChallengeInstance.js';

/**
 * Represents a void trader
 * @augments {WorldstateObject}
 */
export default class WeeklyChallenge extends WorldstateObject {
  /**
   * @param   {object}             data            The Void trader data
   */
  constructor(data) {
    super(data);

    this.challenges = data.Challenges.map((challengeData) => new ChallengeInstance(challengeData));
  }

  /**
   * Returns a string representation of the trader
   * @returns {string} string representation
   */
  toString() {
    return `Starts: ${this.getStartString()}\nEnds: ${this.getEndString()}\nChallenges:\n${this.challenges
      .map((challenge) => `\t${challenge.toString()}`)
      .join('\n')}`;
  }
}
