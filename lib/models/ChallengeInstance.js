import { languageString } from 'warframe-worldstate-data/utilities';

/**
 * Describes a world challenge instance
 */
export default class ChallengeInstance {
  /**
   * @param   {object}             data            The challenge instance data
   * @param   {Dependency}         deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    /**
     * Type of challenge
     * @type {string}
     */
    this.type = languageString(data.Type, locale);

    /**
     * Minimum enemy level to fulfill challenge
     * @type {number}
     */
    this.minEnemyLevel = Number(data.MinimumEnemyLevel);

    /**
     * Required number of units to complete challenge
     * @type {number}
     */
    this.requiredAmount = Number(data.RequiredCount);

    /**
     * Waypoint for amount of units between progression updates
     * @type {number}
     */
    this.progressAmount = Number(data.ProgressIndicatorFreq);

    /**
     * Required damage type
     * @type {string | undefined}
     */
    this.damageType = data.DamageType ? languageString(data.DamageType, locale) : undefined;

    /**
     * Target to fulfill challenge
     * @type {string}
     */
    this.target =
      data.VictimType && data.VictimType[0]
        ? languageString(data.VictimType[0], locale)
        : // eslint-disable-next-line no-underscore-dangle
          data.Script._faction;
  }

  toString() {
    return `Task: ${this.type}\nAmount: ${this.requiredAmount}\nTarget: ${this.target}`;
  }
}
