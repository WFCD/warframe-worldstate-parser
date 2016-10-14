'use strict';

/**
 * Represents an in-game mission
 */
class Mission {
  /**
   * @param   {Object}                  data               The mission data
   * @param   {Object}                  options.translator The string translator
   * @param   {Object.<string, string>} options.md         The markdown settings
   * @param   {function}                options.Reward     The reward parser
   */
  constructor(data, { translator, mdConfig, Reward }) {
    const opts = { translator, mdConfig, Reward };

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The Mission description
     * @type {?string}
     */
    this.description = data.descText
      ? translator.languageString(data.descText)
      : null;

    /**
     * The mission node
     * @type {string}
     */
    this.node = translator.node(data.location);

    /**
     * The mission type
     * @type {string}
     */
    this.type = translator.missionType(data.missionType);

    /**
     * The mission faction
     * @type {string}
     */
    this.faction = translator.faction(data.faction);

    /**
     * The mission reward
     * @type {?Reward}
     */
    this.reward = data.missionReward
      ? new Reward(data.missionReward, opts)
      : null;

    /**
     * The minimum enemy level
     * @type {number}
     */
    this.minEnemyLevel = data.minEnemyLevel;

    /**
     * The maximum enemy level
     * @type {number}
     */
    this.maxEnemyLevel = data.maxEnemyLevel;

    /**
     * The number of waves that the players need to complete
     * @type {?number}
     */
    this.maxWaveNum = data.maxWaveNum || null;
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
