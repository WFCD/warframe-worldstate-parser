import ChallengeInstance, { type RawChallengeInstance } from './ChallengeInstance';
import WorldstateObject, { type BaseContentObject } from './WorldstateObject';

export interface RawWeeklyChallenge extends BaseContentObject {
  Challenges: RawChallengeInstance[];
}

/**
 * Represents a void trader
 * @augments {WorldstateObject}
 */
export default class WeeklyChallenge extends WorldstateObject {
  challenges: ChallengeInstance[];

  /**
   * @param data The Void trader data
   */
  constructor(data: RawWeeklyChallenge) {
    super(data);
    this.challenges = data.Challenges.map((challengeData) => new ChallengeInstance(challengeData));
  }
}
