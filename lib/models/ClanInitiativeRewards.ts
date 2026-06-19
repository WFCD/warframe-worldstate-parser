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
  uniqueName: string;
  reward: string;
  count: number;
  isClaimed: boolean;
  pointsRequired: number;

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
  week: number;
  bonusRegion: string;
  regionUniqueName: string;
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
