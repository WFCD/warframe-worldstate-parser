import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import {
  languageString,
  weeklyReset,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '../supporting';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface VaultBonusReward {
  RewardClaimed: boolean;
  PointThreshold: number;
  ItemCount: number;
  Reward: string;
}

export interface WeeklyVaultBonusReward extends BaseContentObject {
  WeekCount: number;
  BonusRegion: string;
  Rewards: VaultBonusReward[];
}

export class ClanReward {
  /**
   * Reward uniqueName
   */
  @IsString()
  uniqueName: string;

  /**
   * Reward name localized
   */
  @IsString()
  reward: string;

  /**
   * Bundle size for the given reward
   */
  @IsNumber()
  count: number;

  /**
   * Points required to earn reward
   */
  @IsNumber()
  pointsRequired: number;

  /**
   * Whether or not this reward has already been claimed
   */
  @IsBoolean()
  isClaimed: boolean;

  constructor(
    reward: VaultBonusReward,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    this.uniqueName = reward.Reward;
    this.reward = languageString(reward.Reward, locale);
    this.count = reward.ItemCount;
    this.isClaimed = reward.RewardClaimed;
    this.pointsRequired = reward.PointThreshold;
  }

  rewardString(): string {
    return `${this.count}x ${this.reward}`;
  }
}

export class ClanInitiativeRewards extends WorldStateObject {
  /**
   * Current week number since release
   */
  @IsNumber()
  week: number;

  /**
   * Region or planet where resources are doubled
   */
  @IsString()
  bonusRegion: string;
  regionUniqueName: string;
  /**
   * Rewards earned at each point threshold
   */
  @ValidateNested({ each: true })
  @Type(() => ClanReward)
  rewwards: object[];

  constructor(
    data: WeeklyVaultBonusReward,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super(data);
    ({ activation: this.activation, expiry: this.expiry } = weeklyReset());

    this.week = data.WeekCount;
    this.bonusRegion = languageString(data.BonusRegion, locale);
    this.regionUniqueName = data.BonusRegion;
    this.rewwards = data.Rewards;
  }
}
