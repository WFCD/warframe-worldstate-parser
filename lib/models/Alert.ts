import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';

import WorldstateObject, { BaseContentObject } from './WorldstateObject';
import Mission, { RawMission } from './Mission';
import Dependency from '../supporting/Dependency';
import Reward from './Reward';

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
   * ETA string (at time of object creation)
   */
  eta: string;
  /**
   * An array containing the types of all of the alert's rewards
   */
  rewardTypes: string[];

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
    this.eta = this.getETAString();
    this.rewardTypes = this.getRewardTypes()?.length ? this.getRewardTypes()! : ['credits'];
    this.tag = data.Tag || undefined;
  }

  /**
   * Get the alert's description text
   */
  getDescription(): string {
    return this.mission.description;
  }

  /**
   * Get the alert's reward
   */
  getReward(): Reward | undefined {
    return this.mission.reward;
  }

  /**
   * Get a string indicating how much time is left before the alert expires
   */
  getETAString(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }

  /**
   * Get an array containing the types of all of the alert's rewards
   */
  getRewardTypes(): string[] | undefined {
    return this.mission.reward?.getTypes();
  }

  /**
   * The alert's string representation
   */
  toString(): string {
    const lines = [this.mission.toString(), this.getETAString()];

    return `${mdConfig.codeBlock}${lines.join(mdConfig.lineEnd)}${mdConfig.blockEnd}`;
  }
}
