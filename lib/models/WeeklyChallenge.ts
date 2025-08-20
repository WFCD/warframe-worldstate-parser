import WorldstateObject, { BaseContentObject } from './WorldstateObject';
import ChallengeInstance, { RawChallengeInstance } from './ChallengeInstance';

export interface RawWeeklyChallenge extends BaseContentObject {
  Challenges: RawChallengeInstance[];
}

/**
 * Represents a void trader
 * @augments {WorldstateObject}
 */
export default class WeeklyChallenge extends WorldstateObject {
  challenges: ChallengeInstance[]
  
  /**
   * @param   {object}             data            The Void trader data
   */
  constructor(data: RawWeeklyChallenge) {
    super(data);

    this.challenges = data.Challenges.map((challengeData) => new ChallengeInstance(challengeData));
  }

  /**
   * Returns a string representation of the trader
   * @returns {string} string representation
   */
  toString(): string {
    return `Starts: ${this.getStartString()}\nEnds: ${this.getEndString()}\nChallenges:\n${this.challenges
      .map((challenge) => `\t${challenge.toString()}`)
      .join('\n')}`;
  }
}
