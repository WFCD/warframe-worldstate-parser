import { fromNow, parseDate, faction, languageString, node, syndicate } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';
import SyndicateJob from './SyndicateJob.js';
import Reward from './Reward.js';

/**
 * Interim step for an event reward system.
 * @typedef {object} InterimStep
 * @property {number} goal          Goal amount
 * @property {Reward} reward        Reward for reaching the step
 * @property {number} winnerCount   Amount of players at this step
 * @property {object} message       Message received when reaching the interim step
 */

/**
 * Progress for one of multiple stages
 * @typedef {object} ProgressStep
 * @property {string} type         Type of progress
 * @property {number} progressAmt Amount of progress
 */

/**
 * Represents an in-game special event
 * @augments {WorldstateObject}
 */
export default class WorldEvent extends WorldstateObject {
  /**
   * Asynchronously build a new WorldEvent
   * @param   {object}            data            The event data
   * @param   {object}            deps            The dependencies object
   * @param   {string}            deps.locale     Locale to use for translations
   * @returns {Promise.<WorldEvent>}              The created WorldEvent object
   */
  static async build(data, deps) {
    const event = new WorldEvent(data, deps);
    if (data.Jobs) {
      const jobs = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const job of data.Jobs ?? []) {
        jobs.push(await SyndicateJob.build(job, event.expiry, deps));
      }
      event.jobs = jobs;
    }
    if (data.PreviousJobs) {
      const previousJobs = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const job of data.PreviousJobs ?? []) {
        previousJobs.push(await SyndicateJob.build(job, event.expiry, deps));
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
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
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
    this.maximumScore = Number.parseInt(data.Goal, 10);

    /**
     * The current score on the event
     * @type {number}
     */
    this.currentScore = Number.parseInt(data.Count, 10);

    /**
     * The first intermediate score goal
     * @type {?number}
     */
    this.smallInterval = Number.parseInt(data.GoalInterim, 10);

    /**
     * The second intermediate score goal
     * @type {?number}
     */
    this.largeInterval = Number.parseInt(data.GoalInterim2, 10);

    /**
     * The faction that the players must fight in the event
     * @type {string}
     */
    this.faction = faction(data.Faction, locale);

    /**
     * The description of the event
     * @type {string}
     */
    this.description = languageString(data.Desc, locale);

    /**
     * Tooltip for the event
     * @type {?string}
     */
    this.tooltip = languageString(data.ToolTip, locale);

    /**
     * The node where the event takes place
     * @type {?string}
     */
    this.node = node(data.Node, locale);

    /**
     * The other nodes where the event takes place
     * @type {string[]}
     */
    this.concurrentNodes = data.ConcurrentNodes ? data.ConcurrentNodes.map((n) => node(n), locale) : [];

    /**
     * The victim node
     * @type {?string}
     */
    this.victimNode = node(data.VictimNode, locale);

    /**
     * The score description
     * @type {?string}
     */
    this.scoreLocTag = data.Fomorian ? 'Fomorian Assault Score' : languageString(data.ScoreLocTag, locale);

    /**
     * The event's rewards
     * @type {Reward[]}
     */
    this.rewards = Object.keys(data)
      .filter((k) => k.includes('Reward') || k.includes('reward'))
      .map((k) => new Reward(data[k], opts));

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
        goal: Number.parseInt(data.InterimGoals[index], 10),
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
      data.Types.forEach((type, index) => {
        this.progressSteps[index] = {
          type: languageString(type, locale),
          progressAmt: Number.parseInt(data.MultiProgress[index], 10),
        };
      });

      /**
       * Total of all MultiProgress
       * @type {number}
       */
      this.progressTotal = Number.parseFloat(data.MultiProgress.reduce((accumulator, val) => accumulator + val));
    }

    /**
     * Whether to show the total score at the end of the mission
     * @type {boolean}
     */
    this.showTotalAtEndOfMission = data.ShowTotalAtEOM;
    /**
     * Whether the event is personal
     * @type {boolean}
     */
    this.isPersonal = data.Personal;
    /**
     * Whether the event is community
     * @type {boolean}
     */
    this.isCommunity = data.Community;

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

    this.tag = data.Tag;
  }

  /**
   * Get whether the event has expired
   * @returns {boolean} whether the event has expired
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
  }

  /**
   * The event's string representation
   * @returns {string} the event's string representation
   */
  toString() {
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
