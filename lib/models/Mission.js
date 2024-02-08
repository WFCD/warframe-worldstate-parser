import mdConfig from '../supporting/MarkdownSettings.js';
import { languageString, faction, missionType, node } from '../utilities/translation.js';
import Reward from './Reward.js';
import { insist } from '../utilities/integrity.js';

/**
 * Represents an in-game mission
 */
export default class Mission {
  /**
   * @param   {Object}             data            The mission data
   * @param   {string}             locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    const deps = {
      locale,
    };
    insist(data);

    /**
     * The mission's description
     * @type {?string}
     */
    this.description = languageString(data.descText, locale);

    /**
     * The node where the mission takes place
     * @type {string}
     */
    this.node = node(data.location || data.node, locale);

    /**
     * Unlocalized {@link mission#node}
     * @type {string}
     */
    this.nodeKey = node(data.location || data.node, 'en');

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
     * @type {String}
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
    this.target = languageString(data.vipAgent, locale);

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
   * @returns {string}
   */
  toString() {
    const lines = [this.reward.toString()];

    lines.push(`${this.faction} (${this.type})`);
    lines.push(this.node);
    lines.push(`level ${this.minEnemyLevel} - ${this.maxEnemyLevel}`);

    return lines.join(mdConfig.lineEnd);
  }
}
