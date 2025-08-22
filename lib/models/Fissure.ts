import {
  type ContentTimestamp,
  fissureModifier,
  fissureTier,
  fromNow,
  missionType,
  node,
  nodeEnemy,
  nodeMissionType,
  parseDate,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';
import type Dependency from '../supporting/Dependency';
import WorldstateObject, { type BaseContentObject } from './WorldstateObject';

export interface RawFissure extends BaseContentObject {
  Node: string;
  MissionType: string;
  Modifier: string;
  ActiveMissionTier: string;
  Activation: ContentTimestamp;
  Expiry: ContentTimestamp;
  Hard?: boolean;
}

/**
 * Represents a fissure mission
 * @augments {WorldstateObject}
 */
export default class Fissure extends WorldstateObject {
  /**
   * The node where the fissure has appeared
   */
  node: string;

  /**
   * The fissure mission type
   */
  missionType: string;

  /**
   * The fissure mission type key
   */
  missionTypeKey: string;

  /**
   * The faction controlling the node where the fissure has appeared
   */
  enemy: string;

  /**
   * Faction enum for the faction controlling the node where the fissure has appeared
   */
  enemyKey: string;

  /**
   * The node key where the fissure has appeared
   */
  nodeKey: string;

  /**
   * The fissure's tier
   */
  tier: string;

  /**
   * The fissure's tier as a number
   */
  tierNum: string | number;

  /**
   * Whether this fissure corresponds to a RailJack Void Storm
   */
  isStorm: boolean;

  /**
   * Whether this fissure is a Steel Path fissure
   */
  isHard: boolean;

  /**
   * @param   {object}             data            The fissure data
   * @param   {Dependency}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawFissure, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    this.node = node(data.Node, locale);

    this.missionType = data.MissionType ? missionType(data.MissionType, locale) : nodeMissionType(data.Node, locale);

    this.missionTypeKey = data.MissionType ? missionType(data.MissionType) : nodeMissionType(data.Node);

    this.enemy = nodeEnemy(data.Node, locale);

    this.enemyKey = nodeEnemy(data.Node);

    this.nodeKey = node(data.Node);

    this.tier = fissureModifier(data.Modifier || data.ActiveMissionTier, locale);

    this.tierNum = fissureTier(data.Modifier || data.ActiveMissionTier, locale);

    this.activation = parseDate(data.Activation);

    this.expiry = parseDate(data.Expiry);

    this.isStorm = Boolean(data.ActiveMissionTier);

    this.isHard = Boolean(data.Hard);
  }

  /**
   * Whether this is expired (at time of object creation)
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
