import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import Dependency from '../supporting/Dependency';
import Mission, { RawMission } from './Mission';
import Reward from './Reward';
import WorldstateObject, { BaseContentObject } from './WorldstateObject';

export interface RawAlert extends BaseContentObject {
  MissionInfo: RawMission;
  Tag?: string;
}

/**
 * Represents an alert
 * @augments {WorldstateObject}
 */
export default class Alert extends WorldstateObject {
  /**
   * The mission that the players have to complete
   */
  mission: Mission;

  /**
   * A tag that DE occasionally provides, such as `LotusGift`
   */
  tag?: string;

  constructor(data: RawAlert, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    const deps = {
      locale,
    };

    this.mission = new Mission(data.MissionInfo, deps);
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

   /**
   * An array containing the types of all of the alert's rewards
   */
  get rewardTypes(): string[] | undefined {
    return this.reward?.getTypes()?.length ? this.reward.getTypes()! : ['credits']
  }
}
