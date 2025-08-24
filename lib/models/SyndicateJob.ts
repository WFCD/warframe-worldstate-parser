import { languageString } from 'warframe-worldstate-data/utilities';
import type Dependency from '../supporting/Dependency';
import WorldstateObject, { type Identifier } from './WorldstateObject';

const apiBase = process.env.API_BASE_URL || 'https://api.warframestat.us';
const bountyRewardRegex = /(?:Tier([ABCDE])|Narmer)Table([ABC])Rewards/i;
const ghoulRewardRegex = /GhoulBountyTable([AB])Rewards/i;

/**
 * Determine the level string for the bounty
 */
const getLevelString = (job: RawSyndicateJob): string => `${job.minEnemyLevel} - ${job.maxEnemyLevel}`;

const determineLocation = (i18n: string, raw: RawSyndicateJob, isVault?: boolean) => {
  const last = String(i18n).split('/').slice(-1)[0];

  const bountyMatches = last.match(bountyRewardRegex);
  const ghoulMatches = last.match(ghoulRewardRegex);

  const isBounty = bountyMatches?.length;
  const isGhoul = ghoulMatches?.length;
  const isCetus = /eidolonjob/i.test(i18n);
  const isVallis = /venusjob/i.test(i18n);
  const isDeimos = /deimosmissionrewards/i.test(i18n);
  const rotation = isBounty ? bountyMatches[2] : '';
  const levelString = getLevelString(raw);

  let location: string | undefined;
  let levelClause: string | undefined;
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

const getBountyRewards = async (i18n: string, raw: RawSyndicateJob, isVault?: boolean): Promise<string[]> => {
  let location: string | undefined;
  let locationWRot: string | undefined;
  if (i18n.endsWith('PlagueStarTableRewards')) {
    location = 'plague star';
    locationWRot = 'Earth/Cetus (Level 15 - 25 Plague Star), Rot A';
  }
  if (!location || !locationWRot) {
    ({ location, locationWRot } = determineLocation(i18n, raw, isVault));
  }
  const url = `${apiBase}/drops/search/${encodeURIComponent(location!)}?grouped_by=location`;
  const reply: Record<string, { rewards: { item: string }[] }> = await fetch(url)
    .then((res) => res.json())
    .catch(() => {}); // swallow errors
  const pool = reply?.[locationWRot];
  if (!pool) {
    return ['Pattern Mismatch. Results inaccurate.'];
  }
  const results = pool.rewards;
  if (results) {
    return Array.from(new Set(results.map((result) => result.item)));
  }
  return [];
};

const FIFTY_MINUTES = 3000000;

export interface RawSyndicateJob {
  rewards: string;
  isVault?: boolean;
  JobCurrentVersion?: Identifier;
  jobType?: string;
  locationTag?: string;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  xpAmounts: number[];
  masteryReq?: number;
}

/**
 * Represents a syndicate daily mission
 * @augments {WorldstateObject}
 */
export default class SyndicateJob extends WorldstateObject {
  /**
   * Array of strings describing rewards
   */
  rewardPool: string[];

  /**
   * The type of job this is
   */
  type?: string;

  /**
   * Array of enemy levels
   */
  enemyLevels: number[];

  /**
   * Array of standing gains per stage of job
   */
  standingStages: number[];

  /**
   * Minimum mastery required to participate
   */
  minMR: number;

  /**
   * Whether or not this is a Vault job.
   * No indication for difference of normal vs arcana vaults.
   */
  isVault?: boolean;

  /**
   * Corresponding chamber. Nullable
   */
  locationTag?: string;

  /**
   * What time phase this bounty is bound to
   */
  timeBound: string | undefined;

  /**
   * Generate a job with async data (reward pool)
   * @param data   The syndicate mission data
   * @param expiry The syndicate job expiration
   * @param deps   The dependencies object
   * @returns The created SyndicateJob object with rewardPool
   */
  static async build(data: RawSyndicateJob, expiry: Date, deps: Dependency): Promise<SyndicateJob> {
    const job = new SyndicateJob(data, expiry, deps);
    job.rewardPool = await getBountyRewards(data.rewards, data, data.isVault);

    return job;
  }

  /**
   * Construct a job without async data (reward pool)
   * @param data        The syndicate mission data
   * @param expiry      The syndicate job expiration
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   *
   * This DOES NOT populate the reward pool
   */
  constructor(data: RawSyndicateJob, expiry: Date, { locale }: Dependency = { locale: 'en' }) {
    super({
      _id: {
        $oid: data.JobCurrentVersion
          ? data.JobCurrentVersion.$oid
          : `${(data.jobType || '').split('/').slice(-1)[0]}${expiry.getTime()}`,
      },
    });

    this.rewardPool = [];

    const chamber = ((data.locationTag || '').match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) || []).join(' ');

    this.type = data.isVault ? `Isolation Vault ${chamber}` : (data.jobType ? languageString(data.jobType, locale): undefined);

    this.enemyLevels = [data.minEnemyLevel, data.maxEnemyLevel];

    this.standingStages = data.xpAmounts;

    this.minMR = data.masteryReq || 0;

    this.isVault = data.isVault;

    this.locationTag = data.locationTag;

    this.expiry = expiry;

    const jobType = data.jobType ?? '';
    if (jobType.toLowerCase().includes('narmer')) {
      if (jobType.toLowerCase().includes('eidolon')) {
        this.timeBound = 'day';
        this.expiry = new Date(this.expiry.getTime() - FIFTY_MINUTES);
      } else {
        this.timeBound = 'night';
      }
    }
  }
}
