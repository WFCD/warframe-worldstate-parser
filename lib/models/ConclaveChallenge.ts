import {
  type ContentTimestamp,
  conclaveCategory,
  conclaveChallenge,
  conclaveMode,
  fromNow,
  parseDate,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from './@/supporting/Dependency';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawChallenge extends BaseContentObject {
  endDate: ContentTimestamp;
  startDate: ContentTimestamp;
  params: { n: string; v: number }[];
  PVPMode: string;
  Category: string;
  challengeTypeRefID: string;
}

/**
 * Represents a Conclave challenge
 * @augments {WorldStateObject}
 */
export class ConclaveChallenge extends WorldStateObject {
  /**
   * The number of times that the challenge's objective needs to be completed
   */
  amount: number;

  /**
   * The PVP mode that the challenge must be completed in
   */
  mode: string;

  /**
   * The challenge's category (daily, weekly...)
   */
  category: string;

  /**
   * The challenge category unlocalized
   */
  categoryKey: string;

  /**
   * The challenge's description text
   */
  description?: string;

  /**
   * Title of the challenge
   */
  title?: string;

  /**
   * Standing granted by completing challenge.
   */
  standing?: number;

  /**
   * Whether or not this is a daily conclave challenge.
   */
  daily: boolean;

  /**
   * Whether or not this is the root challenge
   */
  rootChallenge: boolean;

  /**
   * @param   {object}             data            The challenge data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(
    data: RawChallenge,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super(data);

    this.expiry = parseDate(data.endDate);

    this.activation = parseDate(data.startDate);

    this.amount = data.params[0].v;

    this.mode = conclaveMode(data.PVPMode, locale);

    this.category = conclaveCategory(data.Category, locale);

    this.categoryKey = conclaveCategory(data.Category, 'en');

    this.daily = this.categoryKey.toLowerCase() === 'day';

    this.rootChallenge = this.categoryKey.toLowerCase() === 'week_root';

    const challenge = conclaveChallenge(data.challengeTypeRefID, locale);

    ({
      title: this.title,
      description: this.description,
      standing: this.standing,
    } = challenge);
  }

  /**
   * Whether or not this is expired (at time of object creation)
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta(): string {
    const timeDelta = fromNow(this.expiry!);
    return timeDeltaToString(timeDelta);
  }
}
