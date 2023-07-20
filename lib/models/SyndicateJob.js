'use strict';

const fetch = require('node-fetch');

const WorldstateObject = require('./WorldstateObject');

const apiBase = process.env.API_BASE_URL || 'https://api.warframestat.us';
const bountyRewardRegex = /(?:Tier([ABCDE])|Narmer)Table([ABC])Rewards/i;
const ghoulRewardRegex = /GhoulBountyTable([AB])Rewards/i;

/**
 * Determine the level string for the bounty
 * @param  {Object} job Original raw job data
 * @returns {string}               level range string
 */
const getLevelString = (job) => `${job.minEnemyLevel} - ${job.maxEnemyLevel}`;

const determineLocation = (i18n, isVault, raw) => {
  const last = String(i18n).split('/').slice(-1)[0];

  const bountyMatches = last.match(bountyRewardRegex);
  const ghoulMatches = last.match(ghoulRewardRegex);

  const isBounty = bountyMatches && bountyMatches.length;
  const isGhoul = ghoulMatches && ghoulMatches.length;
  const isCetus = /eidolonjob/i.test(i18n);
  const isVallis = /venusjob/i.test(i18n);
  const isDeimos = /deimosmissionrewards/i.test(i18n);
  const rotation = isBounty ? bountyMatches[2] : '';
  const levelString = getLevelString(raw);

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
    const variant = isVault ? 'Isolation Vault' : 'Cambion Drift Bounty';
    levelClause = `(Level ${levelString} ${variant})`;
  }
  const locationWRot = `${location}${levelClause}, Rot ${rotation.length ? rotation : 'A'}`;
  return { location, locationWRot };
};

const getBountyRewards = async (i18n, isVault, raw) => {
  let location;
  let locationWRot;
  if (i18n.endsWith('PlagueStarTableRewards')) {
    location = 'plague star';
    locationWRot = 'Earth/Cetus (Level 15 - 25 Plague Star), Rot A';
  }
  if (!location || !locationWRot) {
    ({ location, locationWRot } = determineLocation(i18n, isVault, raw));
  }
  const url = `${apiBase}/drops/search/${encodeURIComponent(location)}?grouped_by=location`;
  const reply = await fetch(url)
    .then((res) => res.json())
    .catch(() => {}); // swallow errors
  const pool = (reply || {})[locationWRot];
  if (!pool) {
    return ['Pattern Mismatch. Results inaccurate.'];
  }
  const results = pool.rewards;
  if (results) {
    return Array.from(new Set(results.map((result) => result.item)));
  }
  /* istanbul ignore next */
  return [];
};

const FIFTY_MINUTES = 3000000;

/**
 * Represents a syndicate daily mission
 * @extends {WorldstateObject}
 */
class SyndicateJob extends WorldstateObject {
  /**
   * @param {Object} data The syndicate mission data
   * @param {Date} expiry The syndicate job expiration
   * @param {Object} deps The dependencies object
   * @param {Object} timeDate Time/Date functions
   * @param {Translator} translator The string translator
   * @param {string} locale Locale to use for translations
   */
  constructor(data, expiry, { translator, timeDate, locale }) {
    super(
      {
        _id: {
          $oid: data.JobCurrentVersion
            ? data.JobCurrentVersion.$oid
            : `${(data.jobType || '').split('/').slice(-1)[0]}${expiry.getTime()}`,
        },
      },
      { timeDate }
    );

    /**
     * Array of strings describing rewards
     * @type {Array.<String>}
     */
    this.rewardPool = [];
    getBountyRewards(data.rewards, data.isVault, data).then((rewards) => {
      this.rewardPool = rewards;
    });

    const chamber = ((data.locationTag || '').match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) || []).join(' ');

    /**
     * The type of job this is
     * @type {String}
     */
    this.type =
      translator.languageString(data.jobType, locale) || `${data.isVault ? 'Isolation Vault' : ''} ${chamber}`;

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

    /**
     * Whether or not this is a Vault job.
     * No indication for difference of normal vs arcana vaults.
     * @type {Boolean}
     */
    this.isVault = data.isVault;

    /**
     * Corresponding chamber. Nullable
     * @type {string|null}
     */
    this.locationTag = data.locationTag;

    /**
     * End time for the syndicate mission.
     * Should be inherited from the Syndicate, but some are timebound.
     * @type {Date}
     */
    this.expiry = expiry;

    /**
     * What time phase this bounty is bound to
     * @type {string}
     */
    this.timeBound = undefined;
    if (data.jobType && data.jobType.toLowerCase().includes('narmer')) {
      if (data.jobType.toLowerCase().includes('eidolon')) {
        this.timeBound = 'day';
        this.expiry = new Date(this.expiry.getTime() - FIFTY_MINUTES);
      } else {
        this.timeBoound = 'night';
      }
    }
  }
}

module.exports = SyndicateJob;
