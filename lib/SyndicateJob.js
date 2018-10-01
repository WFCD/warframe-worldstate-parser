'use strict';

const fetch = require('node-fetch');

const WorldstateObject = require('./WorldstateObject.js');

const bountyRewardRegex = /Tier(A|B|C|D|E)Table(A|B|C)Rewards/ig;
const ghoulRewardRegex = /GhoulBountyTable(A|B)Rewards/ig;

const getCetusBountyRewards = async (i18n) => {
  const bountyMatches = bountyRewardRegex.exec(i18n);

  const ghoulMatches = ghoulRewardRegex.exec(i18n);
  const tier = bountyMatches && bountyMatches.length ? bountyMatches[1] : ghoulMatches && ghoulMatches.length && ghoulMatches[1];
  const rotation = bountyMatches && bountyMatches.length ? bountyMatches[2] : '';
  let levelString = '';

  switch (tier) {
    case 'A':
      levelString = '5 - 15';
      break;
    case 'B':
      levelString = '10 - 30';
      break;
    case 'C':
      levelString = '20 - 40';
      break;
    case 'D':
      levelString = '30 - 50';
      break;
    case 'E':
    default:
      levelString = '40 - 60';
      break;
  }

  const location = `Earth/Cetus (Level ${levelString}${ghoulMatches && ghoulMatches.length ? ' Ghoul' : ''} Bounty)`;
  const locationWRot = rotation.length ? `${location}, Rot ${rotation}` : `${location}, Rot A`;
  const url = `https://api.warframestat.us/drops/search/${encodeURIComponent(location)}?grouped_by=location`;
  try {
    const reply = await fetch(url).then(res => res.json());
    const results = reply[0][locationWRot].rewards;
    if (results) {
      return Array.from(new Set(results.map(result => result.item)));
    }
  } catch (e) {
    console.error(e);
  }

  return [];
};

/**
 * Represents a syndicate daily mission
 * @extends {WorldstateObject}
 */
class SyndicateJob extends WorldstateObject {
  /**
   * @param   {Object}             data            The syndicate mission data
   * @param   {Date}               expiry          The syndicate job expiration
   * @param   {Object}             deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   */
  constructor(data, expiry, { translator }) {
    super({ _id: { $oid: `${data.jobType.split('/').slice(-1)[0]}${expiry.getTime()}` } });

    /**
     * Array of strings describing rewards
     * @type {string}
     */
    this.rewardPool = '';
    getCetusBountyRewards(String(data.rewards).split('/').slice(-1)[0])
      .then(rewards => {
        this.rewardPool = rewards.join(', ');
      });

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
  }
}

module.exports = SyndicateJob;
