import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

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
  /**
   * Array of weekly challenges
   */
  @ApiProperty({
    description: 'Array of weekly challenges',
    type: [ChallengeInstance],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChallengeInstance)
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
