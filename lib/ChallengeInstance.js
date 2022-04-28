'use strict';

/**
 * Describes a world challenge instance
 */
class ChallengeInstance {
  /**
   * @param   {Object}             data            The challenge instance data
   * @param   {Dependency}         deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { translator, locale }) {
    /**
     * Type of challenge
     * @type {string}
     */
    this.type = translator.languageString(data.Type, locale);

    /**
     * Minimum enemy level to fulfill challenge
     * @type {Number}
     */
    this.minEnemyLevel = Number(data.MinimumEnemyLevel);

    /**
     * Required number of units to complete challenge
     * @type {Number}
     */
    this.requiredAmount = Number(data.RequiredCount);

    /**
     * Waypoint for amount of units between progression updates
     * @type {Number}
     */
    this.progressAmount = Number(data.ProgressIndicatorFreq);

    /**
     * Required damage type
     * @type {String|undefined}
     */
    this.damageType = data.DamageType ? translator.languageString(data.DamageType, locale) : undefined;

    /**
     * Target to fulfill challenge
     * @type {string}
     */
    this.target =
      data.VictimType && data.VictimType[0]
        ? translator.languageString(data.VictimType[0], locale)
        : // eslint-disable-next-line no-underscore-dangle
          data.Script._faction;
  }

  toString() {
    return `Task: ${this.type}\nAmount: ${this.requiredAmount}\nTarget: ${this.target}`;
  }
}

module.exports = ChallengeInstance;
