import { languageDesc, languageString } from 'warframe-worldstate-data/utilities';

import WorldstateObject, { BaseContentObject } from './WorldstateObject.js';
import { Locale } from 'warframe-worldstate-data';

const repBase = 1000;

export interface RawNightwaveChallenge extends BaseContentObject {
  Daily?: boolean;
  Challenge: string;
  Permanent?: number | string | boolean;
}

/**
 * Represents an alert
 * @augments {WorldstateObject}
 */
export default class NightwaveChallenge extends WorldstateObject {
  /**
   * Whether or not this is a daily challenge
   */
  isDaily: boolean;

  /**
   * Whether or not the challenge is an elite challenge
   */
  isElite: boolean;

  /**
   * The descriptor for this challenge
   */
  desc: string;

  /**
   * The title for this challenge
   */
  title: string;

  /**
   * Reputation reward for ranking up in the Nightwave
   */
  reputation: number;

  /**
   * Whether this challenge is permanent
   */
  isPermanent: boolean;

  /**
   * @param data        The alert data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawNightwaveChallenge, { locale }: { locale: Locale } = { locale: 'en' }) {
    super(data);

    this.isDaily = data.Daily || false;

    this.isElite = /hard/gi.test(data.Challenge);

    this.desc = languageDesc(data.Challenge, locale);

    this.title = languageString(data.Challenge, locale);

    this.id = `${this.expiry!.getTime()}${data.Challenge.split('/').slice(-1)[0].toLowerCase()}`;

    this.reputation = repBase + (!this.isDaily ? 3500 : 0) + (this.isElite ? 2500 : 0);

    this.isPermanent = Boolean(data?.Permanent);
  }
}
