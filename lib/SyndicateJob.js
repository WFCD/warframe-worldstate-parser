'use strict';

const fetch = require('node-fetch');

const WorldstateObject = require('./WorldstateObject.js');

const apiBase = process.env.API_BASE_URL || 'https://api.warframestat.us';
const bountyRewardRegex = /Tier(A|B|C|D|E)Table(A|B|C)Rewards/i;
const ghoulRewardRegex = /GhoulBountyTable(A|B)Rewards/i;

/**
 * Determine the level string for the bounty
 * @param  {string[]} bountyMatches list of bounty matches
 * @param  {string} tier          bounty tier identifier
 * @param  {boolean} cambion      whether or not the bounty is a cambion bounty
 * @returns {string}               level range string
 */
const getLevelString = (bountyMatches, tier, cambion) => {
  let levelString = '';
  if (bountyMatches && bountyMatches.length) {
    if (!cambion) {
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
          levelString = '5 - 15';
          break;
        case 'B':
          levelString = '15 - 25';
          break;
        case 'C':
          levelString = '25 - 30';
          break;
        case 'D':
          levelString = '30 - 40';
          break;
        case 'E':
          levelString = '40 - 60';
          break;
        case 'F':
          levelString = '100 - 100';
          break;
        default:
          break;
      }
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

  return levelString;
};

const determineLocation = (i18n) => {
  const last = String(i18n).split('/').slice(-1)[0];

  const bountyMatches = last.match(bountyRewardRegex);
  const ghoulMatches = last.match(ghoulRewardRegex);

  const isBounty = bountyMatches && bountyMatches.length;
  const isGhoul = ghoulMatches && ghoulMatches.length;
  const isCetus = /eidolonjob/i.test(i18n);
  const isVallis = /venusjob/i.test(i18n);
  const isDeimos = /deimosmissionrewards/i.test(i18n);

  // eslint-disable-next-line no-nested-ternary
  const tier = isBounty ? bountyMatches[1] : (isGhoul ? ghoulMatches[1] : '');
  const rotation = isBounty ? bountyMatches[2] : '';
  const levelString = getLevelString(bountyMatches, tier, isDeimos);

  let location;
  let levelClause;
  if (isCetus) {
    location = 'Earth/Cetus ';
    if (isGhoul) {
      levelClause = `(Level ${levelString} Ghoul Bounty)`;
    } else {
      levelClause = `(Level ${levelString} Cetus Bounty)`;
    }
  }
  if (isVallis) {
    location = 'Venus/Orb Vallis ';
    levelClause = `(Level ${levelString} Orb Vallis Bounty)`;
  }
  if (isDeimos) {
    location = 'Deimos/Cambion Drift '; // this will need to be updated when the actual drops are released
    levelClause = `(Level ${levelString} Cambion Drift Bounty)`;
  }
  const locationWRot = `${location}${levelClause}, Rot ${rotation.length ? rotation : 'A'}`;
  return { location, locationWRot };
};

const getBountyRewards = async (i18n) => {
  try {
    const { location, locationWRot } = determineLocation(i18n);
    const url = `${apiBase}/drops/search/${encodeURIComponent(location)}?grouped_by=location`;
    const reply = await fetch(url).then((res) => res.json()).catch(() => {}); // swallow errors
    const pool = (reply || {})[locationWRot];
    if (!pool) {
      return ['Pattern Mismatch. Results inaccurate.'];
    }
    const results = pool.rewards;
    if (results) {
      return Array.from(new Set(results.map((result) => result.item)));
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
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, expiry, { translator, timeDate, locale }) {
    super({ _id: { $oid: data.JobCurrentVersion ? data.JobCurrentVersion.$oid : `${data.jobType.split('/').slice(-1)[0]}${expiry.getTime()}` } }, { timeDate });

    /**
     * Array of strings describing rewards
     * @type {Array.<String>}
     */
    this.rewardPool = [];
    getBountyRewards(data.rewards)
      .then((rewards) => {
        this.rewardPool = rewards;
      });

    /**
     * The type of job this is
     * @type {String}
     */
    this.type = translator.languageString(data.jobType, locale);

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
     * Minimum mastery required to participate
     * @type {Number}
     */
    this.minMR = data.masteryReq || 0;
  }
}

module.exports = SyndicateJob;
