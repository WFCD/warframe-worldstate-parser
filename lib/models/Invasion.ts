import {
  parseDate,
  timeDeltaToString,
  toNow,
  node,
  languageString,
  faction,
  ContentTimestamp,
} from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import Reward, { RawReward } from './Reward.js';
import WorldstateObject, { BaseContentObject } from './WorldstateObject.js';
import Dependency from '../supporting/Dependency.js';

export interface RawInvasion extends BaseContentObject {
  Node: string;
  LocTag: string;
  DefenderMissionInfo: { faction: string };
  AttackerReward: RawReward;
  DefenderReward: RawReward;
  AttackerMissionInfo: { faction: string };
  Activation: ContentTimestamp;
  Count: number;
  Goal: number;
  Completed: boolean;
}

/**
 * An invasion participant
 */
interface InvasionParticipant {
  /**
   * Reward for supporting this participant in the invasion
   */
  reward?: Reward;

  /**
   * Faction of this participant (localized)
   */
  faction: string;

  /**
   *  Faction of this participant (always English)
   */
  factionKey: string;
}

/**
 * Represents an invasion
 */
export default class Invasion extends WorldstateObject {
  /**
   * The node where the invasion is taking place
   */
  node: string;

  /**
   * The node key where the invasion is taking place
   */
  nodeKey: string;

  /**
   * The invasion's description
   */
  desc: string;

  /**
   * Invasion attacker
   */
  attacker: InvasionParticipant;

  /**
   * Invasion defender
   */
  defender: InvasionParticipant;

  /**
   * Whether this invasion is against the infestation
   */
  vsInfestation: boolean;

  /**
   * The signed count of completed runs. Supporting the attackers makes the count go up,
   * supporting the defenders makes it go down
   */
  count: number;
  /**
   * The number of runs that one side needs to win
   */
  requiredRuns: number;

  /**
   * The invasion's completion percentage. Defenders win if it gets to 0
   * Grineer vs. Corpus invasions start at 50, Infested invasions start at 100
   */
  completion: number;

  /**
   * Whether the invasion has finished
   */
  completed: boolean;

  /**
   * @param   {object}             data            The invasion data
   * @param   {Dependency}         deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawInvasion, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);
    const opts = { locale };

    this.node = node(data.Node, locale);

    this.nodeKey = node(data.Node);

    this.desc = languageString(data.LocTag, locale);

    this.attacker = {
      reward: Object.keys(data?.AttackerReward || {})?.length ? new Reward(data.AttackerReward, opts) : undefined,
      faction: faction(data.DefenderMissionInfo.faction, locale),
      factionKey: faction(data.DefenderMissionInfo.faction, 'en'),
    };

    this.defender = {
      reward: Object.keys(data?.DefenderReward || {})?.length ? new Reward(data.DefenderReward, opts) : undefined,
      faction: faction(data.AttackerMissionInfo.faction, locale),
      factionKey: faction(data.AttackerMissionInfo.faction, 'en'),
    };

    this.vsInfestation = /infest/i.test(data.DefenderMissionInfo.faction);

    this.count = data.Count;

    this.requiredRuns = data.Goal;

    this.completion = (1 + data.Count / data.Goal) * (this.vsInfestation ? 100 : 50);

    this.completed = data.Completed;
  }

  /**
   * Whether or not the attackers are winning.
   * This is always false when the infestation is attacking
   */
  get isAttackerWinning(): boolean {
    return this.count > 0;
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta(): string {
    return timeDeltaToString(this.getRemainingTime());
  }

  /**
   * An array containing the types of all of the invasions's rewards
   */
  get rewardTypes(): string[] {
    return [...(this.attacker.reward?.getTypes() ?? []), ...(this.defender.reward?.getTypes() ?? [])];
  }

  /**
   * Get an estimation of how much time is left before the invasion ends in milliseconds
   */
  private getRemainingTime(): number {
    const completedRuns = Math.abs(this.count);
    const elapsedMillis = toNow(this.activation!);
    const remainingRuns = this.requiredRuns - completedRuns;
    return remainingRuns * (elapsedMillis / completedRuns);
  }
}
