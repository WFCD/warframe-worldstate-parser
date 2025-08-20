import { languageString, faction, missionType, node, insist } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';

import Reward, { RawReward } from './Reward';
import Dependency from '../supporting/Dependency';

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
  description: string;
  node: string;
  nodeKey: string;
  type: string;
  typeKey: string;
  faction: string;
  factionKey: string;
  reward: Reward | undefined;
  minEnemyLevel: any;
  maxEnemyLevel: any;
  maxWaveNum: any;
  nightmare: any;
  archwingRequired: any;
  isSharkwing: any;
  levelOverride: string;
  enemySpec: string;
  advancedSpawners: any;
  requiredItems: any;
  consumeRequiredItems: any;
  target: string | undefined;
  leadersAlwaysAllowed: any;
  goalTag: any;
  levelAuras: any;
  exclusiveWeapon: string;

  /**
   * @param   {object}             data            The mission data
   * @param   {string}             locale     Locale to use for translations
   */
  constructor(data: RawMission, { locale = 'en' }: Dependency = { locale: 'en' }) {
    const deps = { locale };
    insist({ ...data });

    /**
     * The mission's description
     * @type {?string}
     */
    this.description = languageString(data.descText, locale);

    /**
     * The node where the mission takes place
     * @type {string}
     */
    this.node = node(data.node || data.location, locale);

    /**
     * Unlocalized {@link mission#node}
     * @type {string}
     */
    this.nodeKey = node(data.node || data.location, 'en');

    /**
     * The mission's type
     * @type {string}
     */
    this.type = missionType(data.missionType, locale);

    /**
     * The mission's type
     * @type {string}
     */
    this.typeKey = missionType(data.missionType, 'en');

    /**
     * The factions that the players must fight in the mission
     * @type {string}
     */
    this.faction = faction(data.faction, locale);

    /**
     * The factions that the players must fight in the mission
     * @type {string}
     */
    this.factionKey = faction(data.faction, 'en');

    /**
     * The mission's reward
     * @type {?Reward}
     */
    this.reward = data.missionReward ? new Reward(data.missionReward, deps) : undefined;

    /**
     * The minimum level of the enemies in the mission
     * @type {number}
     */
    this.minEnemyLevel = data.minEnemyLevel;

    /**
     * The maximum level of the enemies in the mission
     * @type {number}
     */
    this.maxEnemyLevel = data.maxEnemyLevel;

    /**
     * The number of waves that the players need to complete (undefined if not applicable)
     * @type {?number}
     */
    this.maxWaveNum = data.maxWaveNum;

    /**
     * The Mission's nightmare boolean
     * @type {boolean}
     */
    this.nightmare = data.nightmare || false;

    /**
     * The Mission's archwing requirement
     * @type {boolean}
     */
    this.archwingRequired = data.archwingRequired || false;

    /**
     * The Mission's sharkwing requirement
     * @type {boolean}
     */
    this.isSharkwing = data.isSharkwingMission || false;

    /**
     * Override for the map on this mission
     * @type {string}
     */
    this.levelOverride = languageString(data.levelOverride, locale);

    /**
     * Enemy specification for the mission
     * @type {string}
     */
    this.enemySpec = languageString(data.enemySpec, locale);

    /**
     * Array of strings denoting extra spawners for a mission
     * @type {string[]}
     */
    this.advancedSpawners = (data.advancedSpawners || []).map((spawner) => languageString(spawner, locale));

    /**
     * Items required to enter the mission
     * @type {string[]}
     */
    this.requiredItems = (data.requiredItems || []).map((reqItem) => languageString(reqItem, locale));

    /**
     * Whether or not the required items are consumed
     * @type {boolean}
     */
    this.consumeRequiredItems = data.consumeRequiredItems;

    /**
     * Target for the mission
     * @type {string}
     */
    this.target = data.vipAgent ? languageString(data.vipAgent, locale) : undefined;

    /**
     * Whether or not leaders are always allowed
     * @type {boolean}
     */
    this.leadersAlwaysAllowed = data.leadersAlwaysAllowed;

    /**
     * A tag for the event that this corresponds to
     * @type {string}
     */
    this.goalTag = data.goalTag;

    /**
     * Affectors for this mission
     * @type {string[]}
     */
    this.levelAuras = (data.levelAuras || []).map((aura) => languageString(aura, locale));

    /**
     * Only weapon allowed for the mission
     * @type {string}
     */
    this.exclusiveWeapon = languageString(data.exclusiveWeapon, locale);
  }

  /**
   * The Mission's string representation
   * @returns {string} Mission's string representation
   */
  toString(): string {
    const lines = [];
    if (this.reward) lines.push(this.reward.toString());

    lines.push(`${this.faction} (${this.type})`);
    lines.push(this.node);
    lines.push(`level ${this.minEnemyLevel} - ${this.maxEnemyLevel}`);

    return lines.join(mdConfig.lineEnd);
  }
}
