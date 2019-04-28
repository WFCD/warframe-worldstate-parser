'use strict';

/**
 * Represents an in-game mission
 */
class Mission {
  /**
   * @param   {Object}             data            The mission data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {function}           deps.Reward     The Reward parser
   */
  constructor(data, { mdConfig, translator, Reward }) {
    const deps = { mdConfig, translator, Reward };

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The mission's description
     * @type {?string}
     */
    this.description = translator.languageString(data.descText);

    /**
     * The node where the mission takes place
     * @type {string}
     */
    this.node = translator.node(data.location);

    /**
     * The mission's type
     * @type {string}
     */
    this.type = translator.missionType(data.missionType);

    /**
     * The factions that the players must fight in the mission
     * @type {string}
     */
    this.faction = translator.faction(data.faction);

    /**
     * The mission's reward
     * @type {?Reward}
     */
    this.reward = data.missionReward
      ? new Reward(data.missionReward, deps)
      : undefined;

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
     * A tag that DE occasionally provides, such as `LotusGift`
     * @type {[type]}
     */
    this.tag = data.Tag || undefined;
  }

  /**
   * The Mission's string representation
   * @returns {string}
   */
  toString() {
    const lines = [
      this.reward.toString(),
    ];

    lines.push(`${this.faction} (${this.type})`);
    lines.push(this.node);
    lines.push(`level ${this.minEnemyLevel} - ${this.maxEnemyLevel}`);

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = Mission;
