'use strict';

const fetch = require('node-fetch');

const WorldstateObject = require('./WorldstateObject.js');

const bountyRewardRegex = /Tier(A|B|C|D|E)Table(A|B|C)Rewards/i;
const ghoulRewardRegex = /GhoulBountyTable(A|B)Rewards/i;

const determineLocation = (i18n) => {
  const last = String(i18n).split('/').slice(-1)[0];
  const bountyMatches = last.match(bountyRewardRegex);

  const isCetus = /eidolon\/jobs/i.test(i18n);
  const isVallis = /eidolon\/jobs/i.test(i18n);

  const ghoulMatches = last.match(ghoulRewardRegex);
  const tier = bountyMatches && bountyMatches.length
    ? bountyMatches[1]
    : ghoulMatches && ghoulMatches.length && ghoulMatches[1];
  const rotation = bountyMatches && bountyMatches.length ? bountyMatches[2] : '';
  let levelString = '';

  if (bountyMatches && bountyMatches.length) {
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
        levelString = '40 - 60';
        break;
      default:
        break;
    }
  } else {
    switch (tier) {
      case 'A':
        levelString = '15 - 25';
        break;
      case 'B':
        levelString = '40 - 50';
        break;
      default:
        break;
    }
  }
  let location;
  if (isCetus) {
    if (ghoulMatches && ghoulMatches.length) {
      location = `Earth/Cetus (Level ${levelString} Ghoul Bounty)`;
    } else {
      location = `Earth/Cetus (Level ${levelString} Bounty)`;
    }
  }
  if (isVallis) {
    location = `Orb Vallis/Venus (Level ${levelString} Bounty)`;
  }

  const locationWRot = rotation.length ? `${location}, Rot ${rotation}` : `${location}, Rot A`;
  return { location, locationWRot };
};

const getCetusBountyRewards = async (i18n) => {
  try {
    const { location, locationWRot } = determineLocation(i18n);
    const url = `https://api.warframestat.us/drops/search/${encodeURIComponent(location)}?grouped_by=location`;

    const reply = await fetch(url).then(res => res.json());
    const pool = reply[0][locationWRot];
    if (!pool) {
      return ['Pattern Mismatch. Results inaccurate.'];
    }
    const results = pool.rewards;
    if (results) {
      return Array.from(new Set(results.map(result => result.item)));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
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
  constructor(data, expiry, { translator, timeDate }) {
    super({ _id: { $oid: `${data.jobType.split('/').slice(-1)[0]}${expiry.getTime()}` } }, { timeDate });

    /**
     * Array of strings describing rewards
     * @type {string}
     */
    this.rewardPool = '';
    getCetusBountyRewards(data.rewards)
      .then((rewards) => {
        this.rewardPool = rewards;
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
