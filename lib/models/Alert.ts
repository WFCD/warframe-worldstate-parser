import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import type { Dependency } from '../supporting';
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
  mission: Mission;

  /**
   * An array containing the types of all of the alert's rewards
   */
  rewardTypes: string[];

  /**
   * A tag that DE occasionally provides, such as `LotusGift`
   */
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
