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
  /**
   * The sortie's reward pool
   */
  rewardPool: string;

  /**
   * The sortie's variants
   */
  variants: SortieVariant[];

  /**
   * Archon hunt missions if sortie is an archon hunt
   */
  missions: Mission[];

  /**
   * The sortie's boss
   */
  boss: string;

  /**
   * The sortie's faction
   */
  faction: string;

  /**
   * The sortie's faction
   */
  factionKey: string;

  /**
   * @param data        The data for all daily sorties
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawSortie, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    const opts = {
      mdConfig,
      sortieData,
      locale,
    };

    this.activation = parseDate(data.Activation);
    this.expiry = parseDate(data.Expiry);

    this.rewardPool = languageString(data.Reward, locale);

    this.variants = (data.Variants ?? []).map((v) => new SortieVariant(v, opts));

    this.missions = (data.Missions ?? []).map((v) => new Mission(v, opts));

    this.boss = sortieBoss(data.Boss, locale);

    this.faction = sortieFaction(data.Boss, locale);

    this.factionKey = sortieFaction(data.Boss, 'en');
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }

  /**
   * Whether this is expired (at time of object creation)
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }
}
