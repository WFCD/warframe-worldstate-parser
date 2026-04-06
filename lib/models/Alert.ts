import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { Mission, type RawMission } from './Mission';
import type { Reward } from './Reward';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawAlert extends BaseContentObject {
  MissionInfo: RawMission;
  Tag?: string;
}

/**
 * Represents an alert
 * @augments {WorldStateObject}
 */
export class Alert extends WorldStateObject {
  /**
   * The mission that the players have to complete
   */
  @ApiProperty({
    description: 'The mission that players must complete for this alert',
    type: () => Mission,
  })
  @ValidateNested()
  @Type(() => Mission)
  mission: Mission;

  /**
   * An array containing the types of all of the alert's rewards
   */
  @ApiProperty({
    description: 'Types of rewards available from this alert',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  rewardTypes: string[];

  /**
   * A tag that DE occasionally provides, such as `LotusGift`
   */
  @ApiPropertyOptional({
    description: 'Special tag for the alert (e.g., LotusGift)',
  })
  @IsOptional()
  @IsString()
  tag?: string;

  constructor(
    data: RawAlert,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super(data);

    const deps = {
      locale,
    };

    this.mission = new Mission(data.MissionInfo, deps);
    this.rewardTypes = this.reward?.getTypes()?.length
      ? this.reward.getTypes()!
      : ['credits'];
    this.tag = data.Tag || undefined;
  }

  /**
   * Alert's description
   */
  get description(): string {
    return this.mission.description;
  }

  /**
   * Alert rewards
   */
  get reward(): Reward | undefined {
    return this.mission.reward;
  }

  /**
   * How much time is left before the alert expires
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
