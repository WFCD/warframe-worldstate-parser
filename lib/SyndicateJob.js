'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a syndicate daily mission
 * @extends {WorldstateObject}
 */
class SyndicateJob extends WorldstateObject {
    /**
     * @param   {Object}             data            The syndicate mission data
     * @param   {Object}             deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     */
    constructor(data, expiry, { translator }) {
      super({ _id: { $oid: `${data.jobType.toLowerCase().split('/').slice(-1)[0]}${expiry.getTime()}` } });

      /**
       * The type of job this is
       * @type {String}
       */
      this.type = translator.languageString(data.jobType);

      /**
       * Array of enemy levels
       * @type {Array.<number>}
       */
      this.enemyLevels = [data.minEnemyLevel, data.maxEnemyLevel];

      /**
       * Array of standing gains per stage of job
       * @type {Array.<number>}
       */
      this.standingStages = data.xpAmounts;
        
      /**
       * Array of strings describing rewards
       * @type {string}
       */
      this.rewardPool = translator.languageString(data.rewards).split(',').map(str => str.trim());
  }
}

module.exports = SyndicateJob;
