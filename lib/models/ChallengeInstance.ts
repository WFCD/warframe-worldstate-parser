import { languageString } from 'warframe-worldstate-data/utilities';
import Dependency from '../supporting/Dependency';

export interface RawChallengeInstance {
  Type: string;
  MinimumEnemyLevel: string;
  RequiredCount: string;
  ProgressIndicatorFreq: string;
  DamageType: string;
  VictimType?: string[];
  Script?: { _faction: string };
}

/**
 * Describes a world challenge instance
 */
export default class ChallengeInstance {
  /**
   * Type of challenge
   */
  type: string;

  /**
   * Minimum enemy level to fulfill challenge
   */
  minEnemyLevel: number;

  /**
   * Required number of units to complete challenge
   */
  requiredAmount: number;

  /**
   * Waypoint for amount of units between progression updates
   */
  progressAmount: number;

  /**
   * Required damage type
   */
  damageType: string | undefined;

  /**
   * Target to fulfill challenge
   */
  target?: string;

  /**
   * @param   data            The challenge instance data
   * @param   deps            The dependencies object
   * @param   deps.locale     Locale to use for translations
   */
  constructor(data: RawChallengeInstance, { locale = 'en' }: Dependency = { locale: 'en' }) {
    this.type = languageString(data.Type, locale);

    this.minEnemyLevel = Number(data.MinimumEnemyLevel);

    this.requiredAmount = Number(data.RequiredCount);

    this.progressAmount = Number(data.ProgressIndicatorFreq);

    this.damageType = data.DamageType ? languageString(data.DamageType, locale) : undefined;

    this.target =
      data.VictimType && data.VictimType[0]
        ? languageString(data.VictimType[0], locale)
        : // eslint-disable-next-line no-underscore-dangle
          data.Script?._faction;
  }

  toString(): string {
    return `Task: ${this.type}\nAmount: ${this.requiredAmount}\nTarget: ${this.target}`;
  }
}
