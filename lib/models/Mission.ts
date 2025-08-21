import { faction, insist, languageString, missionType, node } from 'warframe-worldstate-data/utilities';

import Dependency from '../supporting/Dependency';
import Reward, { RawReward } from './Reward';

export interface RawMission {
  descText: string;
  location: string;
  node?: string;
  missionType: string;
  faction: string;
  missionReward: RawReward;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  maxWaveNum?: number;
  nightmare?: boolean;
  archwingRequired?: boolean;
  isSharkwingMission?: boolean;
  levelOverride: string;
  enemySpec: string;
  advancedSpawners?: string[];
  requiredItems?: string[];
  consumeRequiredItems?: boolean;
  vipAgent?: string;
  leadersAlwaysAllowed?: boolean;
  goalTag?: string;
  levelAuras?: string[];
  exclusiveWeapon: string;
}

/**
 * Represents an in-game mission
 */
export default class Mission {
  /**
   * The mission's description
   */
  description: string;

  /**
   * The node where the mission takes place
   */
  node: string;

  /**
   * Unlocalized node
   */
  nodeKey: string;

  /**
   * The mission's type
   */
  type: string;

  /**
   * The mission's type
   */
  typeKey: string;

  /**
   * The factions that the players must fight in the mission
   */
  faction: string;

  /**
   * The factions that the players must fight in the mission
   */
  factionKey: string;

  /**
   * The mission's reward
   */
  reward?: Reward;

  /**
   * The minimum level of the enemies in the mission
   */
  minEnemyLevel: number;

  /**
   * The maximum level of the enemies in the mission
   */
  maxEnemyLevel: number;

  /**
   * The number of waves that the players need to complete (undefined if not applicable)
   */
  maxWaveNum?: number;

  /**
   * The Mission's nightmare boolean
   */
  nightmare: boolean;

  /**
   * The Mission's archwing requirement
   */
  archwingRequired: boolean;

  /**
   * The Mission's sharkwing requirement
   */
  isSharkwing: boolean;

  /**
   * Override for the map on this mission
   */
  levelOverride: string;

  /**
   * Enemy specification for the mission
   */
  enemySpec: string;

  /**
   * Array of strings denoting extra spawners for a mission
   */
  advancedSpawners: string[];

  /**
   * Items required to enter the mission
   */
  requiredItems: string[];

  /**
   * Whether or not the required items are consumed
   */
  consumeRequiredItems?: boolean;

  /**
   * Target for the mission
   */
  target?: string;

  /**
   * Whether or not leaders are always allowed
   */
  leadersAlwaysAllowed?: boolean;

  /**
   * A tag for the event that this corresponds to
   */
  goalTag: any;

  /**
   * Affectors for this mission
   */
  levelAuras: string[];

  /**
   * Only weapon allowed for the mission
   */
  exclusiveWeapon: string;

  /**
   * @param data   The mission data
   * @param locale Locale to use for translations
   */
  constructor(data: RawMission, { locale = 'en' }: Dependency = { locale: 'en' }) {
    const deps = { locale };
    insist({ ...data });

    this.description = languageString(data.descText, locale);

    this.node = node(data.node || data.location, locale);

    this.nodeKey = node(data.node || data.location, 'en');

    this.type = missionType(data.missionType, locale);

    this.typeKey = missionType(data.missionType, 'en');

    this.faction = faction(data.faction, locale);

    this.factionKey = faction(data.faction, 'en');

    this.reward = data.missionReward ? new Reward(data.missionReward, deps) : undefined;

    this.minEnemyLevel = data.minEnemyLevel;

    this.maxEnemyLevel = data.maxEnemyLevel;

    this.maxWaveNum = data.maxWaveNum;

    this.nightmare = data.nightmare || false;

    this.archwingRequired = data.archwingRequired || false;

    this.isSharkwing = data.isSharkwingMission || false;

    this.levelOverride = languageString(data.levelOverride, locale);

    this.enemySpec = languageString(data.enemySpec, locale);

    this.advancedSpawners = (data.advancedSpawners || []).map((spawner) => languageString(spawner, locale));

    this.requiredItems = (data.requiredItems || []).map((reqItem) => languageString(reqItem, locale));

    this.consumeRequiredItems = data.consumeRequiredItems;

    this.target = data.vipAgent ? languageString(data.vipAgent, locale) : undefined;

    this.leadersAlwaysAllowed = data.leadersAlwaysAllowed;

    this.goalTag = data.goalTag;

    this.levelAuras = (data.levelAuras || []).map((aura) => languageString(aura, locale));

    this.exclusiveWeapon = languageString(data.exclusiveWeapon, locale);
  }
}
