import wsData from 'warframe-worldstate-data';
import {
  fromNow,
  parseDate,
  timeDeltaToString,
  languageString,
  sortieBoss,
  sortieFaction,
} from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';

import WorldstateObject, { BaseContentObject } from './WorldstateObject';
import SortieVariant, { RawSortieVariant } from './SortieVariant';
import Mission, { RawMission } from './Mission';
import Dependency from '../supporting/Dependency';

const { sortie: sortieData } = wsData;

export interface RawSortie extends BaseContentObject {
  Reward: string;
  Variants?: RawSortieVariant[];
  Missions?: RawMission[];
  Boss: string;
}

/**
 * Represents a daily sortie
 * @augments {WorldstateObject}
 */
export default class Sortie extends WorldstateObject {
  rewardPool: string;
  variants: SortieVariant[];
  missions: Mission[];
  boss: string;
  faction: string;
  factionKey: string;
  expired: boolean;
  eta: string;
  
  /**
   * @param   {object}            data               The data for all daily sorties
   * @param   {object}            deps               The dependencies object
   * @param {string} deps.locale Locale to use for translations
   */
  constructor(data: RawSortie, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    const opts = {
      mdConfig,
      sortieData,
      locale,
    };

    /**
     * The date and time at which the sortie starts
     * @type {Date}
     */
    this.activation = parseDate(data.Activation);

    /**
     * The date and time at which the sortie ends
     * @type {Date}
     */
    this.expiry = parseDate(data.Expiry);

    /**
     * The sortie's reward pool
     * @type {string}
     */
    this.rewardPool = languageString(data.Reward, locale);

    /**
     * The sortie's variants
     * @type {Array.<SortieVariant>}
     */
    this.variants = (data.Variants ?? []).map((v) => new SortieVariant(v, opts));

    this.missions = (data.Missions ?? []).map((v) => new Mission(v, opts));

    /**
     * The sortie's boss
     * @type {string}
     */
    this.boss = sortieBoss(data.Boss, locale);

    /**
     * The sortie's faction
     * @type {string}
     */
    this.faction = sortieFaction(data.Boss, locale);

    /**
     * The sortie's faction
     * @type {string}
     */
    this.factionKey = sortieFaction(data.Boss, 'en');

    /**
     * Whether this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.isExpired();

    /**
     * ETA string (at time of object creation)
     * @type {string}
     */
    this.eta = this.getETAString();
  }

  /**
   * Get the sortie's boss
   * @returns {string} the sortie's boss
   */
  getBoss(): string {
    return this.boss;
  }

  /**
   * Get the sortie's faction
   * @returns {string} the sortie's faction
   */
  getFaction(): string {
    return this.faction;
  }

  /**
   * Gets a string indicating how long it will take for the sortie to end
   */
  getETAString(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }

  /**
   * Get whether or not the sortie has expired
   */
  isExpired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * Returns the sortie's string representation
   */
  toString(): string {
    if (this.isExpired()) {
      return `${mdConfig.codeBlock}There's currently no sortie${mdConfig.blockEnd}`;
    }

    const variantString = this.variants.map((v) => v.toString()).join('');

    return (
      `${mdConfig.codeBlock}${this.getBoss()}: ends in ${this.getETAString()}` +
      `${mdConfig.doubleReturn}${variantString}${mdConfig.blockEnd}`
    );
  }
}
