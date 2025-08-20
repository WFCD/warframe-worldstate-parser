import { fromNow, parseDate, faction, languageString, node, syndicate } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';

import WorldstateObject, { BaseContentObject, ContentTimestamp, Identifier } from './WorldstateObject';
import SyndicateJob, { RawSyndicateJob } from './SyndicateJob';
import Reward, { RawReward } from './Reward';
import Dependency from '../supporting/Dependency';

/**
 * Interim step for an event reward system.
 */
export interface InterimStep {
  goal: number;
  reward: Reward | undefined;
  winnerCount: number;
  message: object;
}

/**
 * Progress for one of multiple stages
 */
export interface ProgressStep {
  type: string;
  progressAmt: number;
}

export interface InterimRewardMessage {
  sender: string;
  subject: string;
  message: string;
  senderIcon: string;
  attachments: string;
}

export interface RawWorldEvent extends BaseContentObject {
  Goal: number;
  Count?: number;
  GoalInterim?: string;
  GoalInterim2?: string;
  Faction?: string;
  Desc: string;
  ToolTip?: string;
  Node?: string;
  ConcurrentNodes?: string[] | undefined;
  VictimNode?: string;
  Fomorian?: string;
  ScoreLocTag?: string;
  HealthPct?: number;
  JobPreviousVersion?: Identifier;
  Reward?: RawReward;
  InterimRewards?: RawReward[];
  InterimRewardMessages?: InterimRewardMessage[];
  InterimGoals: number[];
  _interimWinnerCounts?: number[];
  IsMultiProgress?: boolean;
  Types?: string[];
  MultiProgress?: string[];
  ShowTotalAtEOM?: boolean;
  Personal: boolean;
  Community?: boolean;
  RegionDrops?: string[];
  ArchwingDrops?: string[];
  Metadata?: string;
  CompletionBonus?: number[];
  ScoreVar: string;
  AltExpiry?: ContentTimestamp;
  AltActivation?: ContentTimestamp;
  NextAltExpiry?: ContentTimestamp;
  NextAltActivation?: ContentTimestamp;
  JobAffiliationTag?: string;
  Tag: string;
  Jobs?: RawSyndicateJob[];
  PreviousJobs?: RawSyndicateJob[];
}

/**
 * Represents an in-game special event
 * @augments {WorldstateObject}
 */
export default class WorldEvent extends WorldstateObject {
  jobs: SyndicateJob[];
  previousJobs: SyndicateJob[];
  maximumScore: number;
  currentScore: number;
  smallInterval: number;
  largeInterval: number;
  faction?: string;
  description: string;
  tooltip?: string;
  node?: string;
  concurrentNodes: string[];
  victimNode?: string;
  scoreLocTag?: string;
  rewards: Reward[];
  expired: boolean;
  health: number | undefined;
  previousId: string | undefined;
  interimSteps: InterimStep[];
  progressSteps: ProgressStep[];
  progressTotal: number | undefined;
  showTotalAtEndOfMission: boolean;
  isPersonal: boolean;
  isCommunity: boolean;
  regionDrops: string[];
  archwingDrops: string[];
  asString: string;
  metadata: any;
  completionBonuses: number[];
  scoreVar: string;
  altExpiry: Date;
  altActivation: Date;
  nextAlt: { expiry: Date; activation: Date };
  affiliatedWith: string | undefined;
  tag: string;
  victim: any;

  /**
   * Asynchronously build a new WorldEvent
   * @param   {object}            data            The event data
   * @param   {object}            deps            The dependencies object
   * @param   {string}            deps.locale     Locale to use for translations
   * @returns {Promise.<WorldEvent>}              The created WorldEvent object
   */
  static async build(data: RawWorldEvent, deps: Dependency): Promise<WorldEvent> {
    const event = new WorldEvent(data, deps);
    if (data.Jobs) {
      const jobs = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const job of data.Jobs ?? []) {
        jobs.push(await SyndicateJob.build(job, event.expiry!, deps));
      }
      event.jobs = jobs;
    }
    if (data.PreviousJobs) {
      const previousJobs = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const job of data.PreviousJobs ?? []) {
        previousJobs.push(await SyndicateJob.build(job, event.expiry!, deps));
      }
      event.previousJobs = previousJobs;
    }
    return event;
  }

  /**
   * @param   {object}            data            The event data
   * @param   {object}            deps            The dependencies object
   * @param   {string}            deps.locale     Locale to use for translations
   */
  constructor(data: RawWorldEvent, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    const opts = {
      locale,
    };

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = parseDate(data.Expiry);

    /**
     * The event's main score goal
     * @type {number}
     */
    this.maximumScore = Number.parseInt(String(data.Goal), 10);

    /**
     * The current score on the event
     * @type {number}
     */
    this.currentScore = Number.parseInt(String(data.Count), 10);

    /**
     * The first intermediate score goal
     * @type {?number}
     */
    this.smallInterval = Number.parseInt(String(data.GoalInterim), 10);

    /**
     * The second intermediate score goal
     * @type {?number}
     */
    this.largeInterval = Number.parseInt(String(data.GoalInterim2), 10);

    /**
     * The faction that the players must fight in the event
     * @type {string}
     */
    this.faction = data.Faction ? faction(data.Faction!, locale) : undefined;

    /**
     * The description of the event
     * @type {string}
     */
    this.description = languageString(data.Desc, locale);

    /**
     * Tooltip for the event
     * @type {?string}
     */
    this.tooltip = data.ToolTip ? languageString(data.ToolTip, locale) : undefined;

    /**
     * The node where the event takes place
     * @type {?string}
     */
    this.node = data.Node ? node(data.Node, locale) : undefined;

    /**
     * The other nodes where the event takes place
     * @type {string[]}
     */
    this.concurrentNodes = data.ConcurrentNodes ? data.ConcurrentNodes.map((n) => node(n), locale) : [];

    /**
     * The victim node
     * @type {?string}
     */
    this.victimNode = data.VictimNode ? node(data.VictimNode, locale) : undefined;

    /**
     * The score description
     * @type {?string}
     */
    this.scoreLocTag = data.ScoreLocTag ? languageString(data.ScoreLocTag, locale) : undefined;
    if (data.Fomorian) this.scoreLocTag = 'Fomorian Assault Score';

    /**
     * The event's rewards
     * @type {Reward[]}
     */
    this.rewards = Object.keys(data)
      .filter((k) => k.includes('Reward') || k.includes('reward'))
      .map((k) => new Reward(data[k as keyof RawWorldEvent] as RawReward, opts));

    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.getExpired();

    /**
     * Health remaining for the target
     * @type {number}
     */
    this.health =
      typeof data.HealthPct !== 'undefined' ? Number.parseFloat(((data.HealthPct || 0.0) * 100).toFixed(2)) : undefined;

    this.jobs = [];
    this.previousJobs = [];

    /**
     * Previous job id
     * @type {string}
     */
    this.previousId = (data.JobPreviousVersion || {}).$oid;

    /**
     * Array of steps
     * @type {InterimStep[]}
     */
    this.interimSteps = [];

    (data.InterimRewards || []).forEach((reward, index) => {
      const msg = (data.InterimRewardMessages || [])[index] || {};
      this.interimSteps[index] = {
        goal: Number.parseInt(String(data.InterimGoals[index]), 10),
        reward: reward ? new Reward(reward, opts) : undefined,
        message: {
          sender: languageString(msg.sender, locale),
          subject: languageString(msg.subject, locale),
          message: languageString(msg.message, locale),
          senderIcon: msg.senderIcon,
          attachments: msg.attachments,
        },
        // eslint-disable-next-line no-underscore-dangle
        winnerCount: (data._interimWinnerCounts || [])[index],
      };
    });

    /**
     * Progress Steps, if any are present
     * @type {ProgressStep[]}
     */
    this.progressSteps = [];

    if (data.IsMultiProgress) {
      data.Types?.forEach((type, index) => {
        this.progressSteps[index] = {
          type: languageString(type, locale),
          progressAmt: Number.parseInt(String(data.MultiProgress![index]), 10),
        };
      });

      /**
       * Total of all MultiProgress
       * @type {number}
       */
      this.progressTotal = Number.parseFloat(data.MultiProgress!.reduce((accumulator, val) => accumulator + val));
    }

    /**
     * Whether to show the total score at the end of the mission
     * @type {boolean}
     */
    this.showTotalAtEndOfMission = data.ShowTotalAtEOM ?? false;
    /**
     * Whether the event is personal
     * @type {boolean}
     */
    this.isPersonal = data.Personal;
    /**
     * Whether the event is community
     * @type {boolean}
     */
    this.isCommunity = data.Community ?? false;

    /*
     * Affectors for this mission
     * @type {string[]}
     */
    this.regionDrops = (data.RegionDrops || []).map((drop) => languageString(drop, locale));

    /**
     * Archwing Drops in effect while this event is active
     * @type {string[]}
     */
    this.archwingDrops = (data.ArchwingDrops || []).map((drop) => languageString(drop, locale));

    this.asString = this.toString();

    /**
     * Metadata provided by DE
     * @type {object}
     */
    this.metadata = JSON.parse((data.Metadata || '{}').replace('" ', '"'));

    /**
     * Bonuses given for completion
     * @type {Array.<number>}
     */
    this.completionBonuses = data.CompletionBonus || [];

    this.scoreVar = data.ScoreVar;

    this.altExpiry = parseDate(data.AltExpiry);
    this.altActivation = parseDate(data.AltActivation);

    this.nextAlt = {
      expiry: parseDate(data.NextAltExpiry),
      activation: parseDate(data.NextAltActivation),
    };

    if (data.JobAffiliationTag) {
      this.affiliatedWith = syndicate(data.JobAffiliationTag, locale);
    }

    /**
     * The event's tag
     * @type {string}
     */
    this.tag = data.Tag;
  }

  /**
   * Get whether the event has expired
   * @returns {boolean} whether the event has expired
   */
  getExpired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * The event's string representation
   * @returns {string} the event's string representation
   */
  toString(): string {
    let lines = [];
    if (this.faction) {
      lines.push(`${this.description} : ${this.faction}`);
    } else {
      lines.push(this.description);
    }

    if (this.scoreLocTag && this.maximumScore) {
      lines.push(`${this.scoreLocTag} : ${this.maximumScore}`);
    }

    if (this.rewards.length) {
      lines.push('Rewards:');
      lines = lines.concat(this.rewards.map((r) => r.toString()));
    }
    if (this.node) {
      lines.push(`Battle on ${this.node}`);
    }
    if (this.victim) {
      lines.push(`Protect ${this.victimNode}`);
    }
    if (this.health) {
      lines.push(`${this.health}% Remaining`);
    }

    if (this.affiliatedWith && this.jobs) {
      lines.push(
        `${this.affiliatedWith} will reward you for performing ` +
          `${this.jobs.map((job) => job.type).join(', ')} job${this.jobs.length > 1 ? 's' : ''}`
      );
    }

    return lines.join(mdConfig.lineEnd);
  }
}
