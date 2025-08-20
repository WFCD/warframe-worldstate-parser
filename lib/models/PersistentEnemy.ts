import { parseDate, languageString, node, region } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject, { BaseContentObject, ContentTimestamp } from './WorldstateObject.js';
import { Locale } from 'warframe-worldstate-data';

export interface RawPersistentEnemy extends BaseContentObject {
  AgentType: string;
  LocTag: string;
  Rank: number;
  HealthPercent: string;
  FleeDamage: number;
  Region: number;
  LastDiscoveredTime: ContentTimestamp;
  LastDiscoveredLocation: string;
  Discovered: boolean;
  UseTicketing: boolean;
}

/**
 * Represents a persistent enemy
 * @augments {WorldstateObject}
 */
export default class PersistentEnemy extends WorldstateObject {
  agentType: string;
  locationTag: string;
  rank: number;
  healthPercent: number;
  fleeDamage: number;
  region: string | number;
  lastDiscoveredTime: Date;
  lastDiscoveredAt: string;
  isDiscovered: boolean;
  isUsingTicketing: boolean;
  pid: string;

  /**
   * @param   {object}             data            The persistent enemy data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawPersistentEnemy, { locale }: { locale: Locale } = { locale: 'en' }) {
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
  toString(): string {
    const status = this.isDiscovered ? 'discovered' : 'not discovered';
    const lines = [
      `${this.agentType} last discovered at ${this.lastDiscoveredAt}.`,
      `It has ${this.healthPercent}% health remaining and is currently ${status}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
