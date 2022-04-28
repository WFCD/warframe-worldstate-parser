'use strict';

const WorldstateObject = require('./WorldstateObject');
/**
 * Represents a persistent enemy
 * @extends {WorldstateObject}
 */
class PersistentEnemy extends WorldstateObject {
  /**
   * @param   {Object}             data            The persistent enemy data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, locale }) {
    super(data, { timeDate });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The enemy's type
     * @type {string}
     */
    this.agentType = translator.languageString(data.AgentType, locale);

    /**
     * The location tag
     * @type {string}
     */
    this.locationTag = translator.languageString(data.LocTag, locale);

    /**
     * The enemy's rank
     * @type {number}
     */
    this.rank = data.Rank;

    /**
     * The enemy's remainaing health percentage
     * @type {number}
     */
    this.healthPercent = Number.parseFloat(data.HealthPercent);

    /**
     * The percentual damage that the enemy takes when it's defeated
     * @type {number}
     */
    this.fleeDamage = data.FleeDamage;

    /**
     * The region where the enemy is located
     * @type {string}
     */
    this.region = translator.region(data.Region, locale);

    /**
     * The last time the enemy was discovered
     * @type {Date}
     */
    this.lastDiscoveredTime = timeDate.parseDate(data.LastDiscoveredTime);

    /**
     * The node at which the enemy was last discovered
     * @type {string}
     */
    this.lastDiscoveredAt = translator.node(data.LastDiscoveredLocation, locale);

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

    /**
     * Fake ID incorporating discovery
     * @type {string}
     */
    this.pid = `${this.id}${this.isDiscovered}`;
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
