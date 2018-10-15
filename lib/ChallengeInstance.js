'use strict';

class ChallengeInstance {
  constructor(data, { translator }) {
    /**
     * Type of challenge
     * @type {string}
     */
    this.type = translator.languageString(data.Type);

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
    this.damageType = data.DamageType ? translator.languageString(data.DamageType) : undefined;

    /**
     * Target to fulfill challenge
     * @type {string}
     */
    this.target = data.VictimType && data.VictimType[0]
      ? translator.languageString(data.VictimType[0])
      : data.Script._faction;
  }

  toString() {
    return `Task: ${this.type}\nAmount: ${this.requiredAmount}\nTarget: ${this.target}`;
  }
}

module.exports = ChallengeInstance;
