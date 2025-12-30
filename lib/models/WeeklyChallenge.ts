import {
  ChallengeInstance,
  type RawChallengeInstance,
} from './ChallengeInstance';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawWeeklyChallenge extends BaseContentObject {
  Challenges: RawChallengeInstance[];
}

/**
 * Represents a void trader
 * @augments {WorldStateObject}
 */
export class WeeklyChallenge extends WorldStateObject {
  challenges: ChallengeInstance[];

  /**
   * @param data The Void trader data
   */
  constructor(data: RawWeeklyChallenge) {
    super(data);
    this.challenges = data.Challenges.map(
      (challengeData) => new ChallengeInstance(challengeData)
    );
  }
}
