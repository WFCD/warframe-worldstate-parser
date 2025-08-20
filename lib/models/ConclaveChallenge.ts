import {
  parseDate,
  fromNow,
  timeDeltaToString,
  conclaveMode,
  conclaveCategory,
  conclaveChallenge,
} from 'warframe-worldstate-data/utilities';

import WorldstateObject, { BaseContentObject, ContentTimestamp } from './WorldstateObject';
import Dependency from '../supporting/Dependency';

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
 * @augments {WorldstateObject}
 */
export default class ConclaveChallenge extends WorldstateObject {
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
   * ETA string (at time of object creation)
   */
  eta: string;

  /**
   * Whether or not this is expired (at time of object creation)
   */
  expired: boolean;

  /**
   * Whether or not this is a daily conclave challenge.
   */
  daily: boolean;

  /**
   * Whether or not this is the root challenge
   */
  rootChallenge: boolean;

  /**
   * the end string
   */
  endString: string;

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
   * This challenge as a string
   */
  asString: string;

  /**
   * @param   {object}             data            The challenge data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawChallenge, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    this.expiry = parseDate(data.endDate);

    this.activation = parseDate(data.startDate);

    this.amount = data.params[0].v;

    this.mode = conclaveMode(data.PVPMode, locale);

    this.category = conclaveCategory(data.Category, locale);

    this.eta = this.getEndString();

    this.expired = this.isExpired();

    this.daily = this.isDaily();

    this.rootChallenge = this.isRootChallenge();

    this.endString = this.getEndString();

    const challenge = conclaveChallenge(data.challengeTypeRefID, locale);

    ({ title: this.title, description: this.description, standing: this.standing } = challenge);

    this.asString = this.toString();
  }

  /**
   * Get whether or not the challenge is daily
   */
  isDaily(): boolean {
    return this.category.toLowerCase() === 'day';
  }

  /**
   * Get whether or not this is the weekly root challenge
   */
  isRootChallenge(): boolean {
    return this.category.toLowerCase() === 'week_root';
  }

  /**
   * Get whether or not the challenge has expired
   */
  isExpired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * Get a string indicating how much time is left before the challenge expires
   */
  getEndString(): string {
    const timeDelta = fromNow(this.expiry!);
    return timeDeltaToString(timeDelta);
  }

  /**
   * The conclave challenge's string representation
   */
  toString(): string {
    return `${this.description} on ${this.mode} ${this.amount} times in a ${this.category}`;
  }
}
