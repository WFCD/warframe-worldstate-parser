import { fromNow, timeDeltaToString, languageString } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';

import WorldstateObject, { BaseContentObject } from './WorldstateObject';
import NightwaveChallenge, { RawNightwaveChallenge } from './NightwaveChallenge';
import { Locale } from 'warframe-worldstate-data';

export interface RawNightwave extends BaseContentObject {
  Season: number;
  AffiliationTag: string;
  Phase: number;
  Params: string;
  Challenges?: RawNightwaveChallenge[];
  ActiveChallenges: RawNightwaveChallenge[];
}

/**
 * Represents an alert
 * @augments {WorldstateObject}
 */
export default class Nightwave extends WorldstateObject {
  season: number;
  tag: string;
  phase: number;
  params: Record<string, unknown>;
  possibleChallenges: NightwaveChallenge[];
  activeChallenges: NightwaveChallenge[];
  rewardTypes: string[];

  /**
   * @param   {object}             data            The alert data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawNightwave, { locale }: { locale: Locale } = { locale: 'en' }) {
    super(data);

    this.id = `nightwave${new Date(this.expiry!).getTime()}`;

    const deps = {
      locale,
    };

    /**
     * The current season. 0-indexed.
     * @type {number}
     */
    this.season = data.Season;

    /**
     * Descriptor for affiliation
     * @type {string}
     */
    this.tag = languageString(data.AffiliationTag, locale);

    /**
     * The current season's current phase. 0-indexed.
     * @type {number}
     */
    this.phase = data.Phase;

    /**
     * Misc params provided.
     * @type {object}
     */
    this.params = JSON.parse(data.Params || '{}');

    this.possibleChallenges = (data.Challenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);

    this.activeChallenges = (data.ActiveChallenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);

    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    this.rewardTypes = this.getRewardTypes().length ? this.getRewardTypes() : ['credits'];
  }

  /**
   * Get a string indicating how much time is left before the alert expires
   * @returns {string} estimated timer of the alert
   */
  getETAString(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }

  /**
   * Get an array containing the types of all of the nightwave season's rewards
   * @returns {Array.<string>} an array containing the types of all of the nightwave season's rewards
   */
  getRewardTypes(): string[] {
    return [];
  }

  /**
   * The alert's string representation
   * @returns {string} string representation of the alert
   */
  toString(): string {
    return `${mdConfig.codeBlock}Nightwave Season ${this.season + 1} - ${this.tag} - Phase ${this.phase + 1}${
      mdConfig.blockEnd
    }`;
  }
}
