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
  /**
   * The current season. 0-indexed.
   */
  season: number;

  /**
   * Descriptor for affiliation
   */
  tag: string;

  /**
   * The current season's current phase. 0-indexed.
   */
  phase: number;

  /**
   * Misc params provided.
   */
  params: Record<string, unknown>;

  /**
   * Array of possible challenges
   */
  possibleChallenges: NightwaveChallenge[];

  /**
   * Array of active challenges
   */
  activeChallenges: NightwaveChallenge[];

  /**
   * @param data        The alert data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawNightwave, { locale }: { locale: Locale } = { locale: 'en' }) {
    super(data);
    const deps = { locale };

    this.id = `nightwave${new Date(this.expiry!).getTime()}`;

    this.season = data.Season;

    this.tag = languageString(data.AffiliationTag, locale);

    this.phase = data.Phase;

    this.params = JSON.parse(data.Params || '{}');

    this.possibleChallenges = (data.Challenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);

    this.activeChallenges = (data.ActiveChallenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);
  }

  /**
   * How much time is left before the nightwave expires
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
