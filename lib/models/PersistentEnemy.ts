import { parseDate, languageString, node, region, ContentTimestamp } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject, { BaseContentObject } from './WorldstateObject.js';
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
  /**
   * The enemy's type
   */
  agentType: string;

  /**
   * The location tag
   */
  locationTag: string;

  /**
   * The enemy's rank
   */
  rank: number;

  /**
   * The enemy's remaining health percentage
   */
  healthPercent: number;

  /**
   * The percentual damage that the enemy takes when it's defeated
   */
  fleeDamage: number;

  /**
   * The region where the enemy is located
   */
  region: string | number;

  /**
   * The last time the enemy was discovered
   */
  lastDiscoveredTime: Date;

  /**
   * The node at which the enemy was last discovered
   */
  lastDiscoveredAt: string;

  /**
   * Whether or not the enemy is currently available
   */
  isDiscovered: boolean;

  /**
   * Whether or not the enemy is using ticketing
   */
  isUsingTicketing: boolean;

  /**
   * Fake ID incorporating discovery
   */
  pid: string;

  /**
   * @param data        The persistent enemy data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawPersistentEnemy, { locale }: { locale: Locale } = { locale: 'en' }) {
    super(data);

    this.agentType = languageString(data.AgentType, locale);

    this.locationTag = languageString(data.LocTag, locale);

    this.rank = data.Rank;

    this.healthPercent = Number.parseFloat(data.HealthPercent);

    this.fleeDamage = data.FleeDamage;

    this.region = region(data.Region, locale);

    this.lastDiscoveredTime = parseDate(data.LastDiscoveredTime);

    this.lastDiscoveredAt = node(data.LastDiscoveredLocation, locale);

    this.isDiscovered = data.Discovered;

    this.isUsingTicketing = data.UseTicketing;

    this.pid = `${this.id}${this.isDiscovered}`;
  }

}
