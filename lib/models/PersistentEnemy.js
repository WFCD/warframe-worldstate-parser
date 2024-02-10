import { languageString, node, region } from '../utilities/translation.js';
import { parseDate } from '../utilities/timeDate.js';
import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';

/**
 * Represents a persistent enemy
 * @augments {WorldstateObject}
 */
export default class PersistentEnemy extends WorldstateObject {
  /**
   * @param   {object}             data            The persistent enemy data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    /**
     * The enemy's type
     * @type {string}
     */
    this.agentType = languageString(data.AgentType, locale);

    /**
     * The location tag
     * @type {string}
     */
    this.locationTag = languageString(data.LocTag, locale);

    /**
     * The enemy's rank
     * @type {number}
     */
    this.rank = data.Rank;

    /**
     * The enemy's remaining health percentage
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
    this.region = region(data.Region, locale);

    /**
     * The last time the enemy was discovered
     * @type {Date}
     */
    this.lastDiscoveredTime = parseDate(data.LastDiscoveredTime);

    /**
     * The node at which the enemy was last discovered
     * @type {string}
     */
    this.lastDiscoveredAt = node(data.LastDiscoveredLocation, locale);

    /**
     * Whether or not the enemy is currently available
     * @type {boolean}
     */
    this.isDiscovered = data.Discovered;

    /**
     * Whether or not the enemy is using ticketing
     * @type {boolean}
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
   * @returns {string} string representation
   */
  toString() {
    const status = this.isDiscovered ? 'discovered' : 'not discovered';
    const lines = [
      `${this.agentType} last discovered at ${this.lastDiscoveredAt}.`,
      `It has ${this.healthPercent}% health remaining and is currently ${status}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
