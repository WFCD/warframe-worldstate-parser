'use strict';

const WorldstateObject = require('./WorldstateObject.js');
/**
 * Represents a persistent enemy
 */
class PersistentEnemy extends WorldstateObject {
  /**
   * @param   {Object} data               The persistent enemy data
   * @param   {Object} options.translator The string translator
   * @param   {Object} options.mdConfig   The markdown settings
   */
  constructor(data, { translator, mdConfig }) {
    super(data);

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The enemy's type
     * @type {string}
     */
    this.agentType = translator.languageString(data.AgentType);

    /**
     * The location tag
     * @type {string}
     */
    this.locationTag = translator.languageString(data.LocTag);

    /**
     * The enemy's rank
     * @type {number}
     */
    this.rank = data.Rank;

    /**
     * The health percentage
     * @type {number}
     */
    this.healthPercent = data.HealthPercent;

    /**
     * The percentual damage that the enemy takes when it's defeated
     * @type {number}
     */
    this.fleeDamage = data.FleeDamage;

    /**
     * The region where the enemy is located
     * @type {string}
     */
    this.region = translator.persistentEnemyRegion(data.Region);

    /**
     * The node at which the enemy was last discovered
     * @type {string}
     */
    this.lastDiscoveredAt = translator.node(data.LastDiscoveredAt);

    /**
     * Whether or not the enemy is currently available
     * @type {Boolean}
     */
    this.isDiscovered = data.Discovered;

    /**
     * Whether or not the enemy is using ticketing
     * @type {Boolean}
     */
    this.isUsingTicketing = data.UseTicketing;
  }

  /**
   * Returns a string representation of the persistent enemy
   * @returns {string}
   */
  toString() {
    const status = this.isDiscovered ? 'discovered' : 'not discovered';
    const lines = [
      `${this.agentType} last discovered at ${this.lastDiscoveredAt}.`,
      `It has ${this.healthPercent}% health remaining and is currently ${status}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = PersistentEnemy;
