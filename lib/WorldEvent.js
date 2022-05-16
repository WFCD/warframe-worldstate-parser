'use strict';

const WorldstateObject = require('./WorldstateObject');
const SyndicateJob = require('./SyndicateJob');

/**
 * Interim step for an event reward system.
 * @typedef {Object} InterimStep
 *
 * @property {Number} goal          Goal amount
 * @property {Reward} reward        Reward for reaching the step
 * @property {Number} winnerCount   Amount of players at this step
 * @property {Object} message       Message received when reaching the interim step
 */

/**
 * Progress for one of multiple stages
 * @typedef {Object} ProgressStep
 *
 * @property {string} type
 * @property {Number} progressAmt
 */

/**
 * Represents an in-game special event
 *
 * @extends {WorldstateObject}
 */
class WorldEvent extends WorldstateObject {
  /**
   * @param   {Object}            data            The event data
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   * @param   {Translator}        deps.translator The string translator
   * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
   * @param   {Reward}            deps.Reward     The Reward parser
   * @param   {string}            deps.locale     Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, Reward, locale }) {
    super(data, { timeDate });

    const opts = {
      translator,
      mdConfig,
      Reward,
      timeDate,
      locale,
    };

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.Expiry);

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
    this.faction = translator.faction(data.Faction, locale);

    /**
     * The description of the event
     * @type {string}
     */
    this.description = translator.languageString(data.Desc, locale);

    /**
     * Tooltip for the event
     * @type {?string}
     */
    this.tooltip = translator.languageString(data.ToolTip, locale);

    /**
     * The node where the event takes place
     * @type {?string}
     */
    this.node = translator.node(data.Node, locale);

    /**
     * The other nodes where the event takes place
     * @type {string[]}
     */
    this.concurrentNodes = data.ConcurrentNodes ? data.ConcurrentNodes.map((n) => translator.node(n), locale) : [];

    /**
     * The victim node
     * @type {?string}
     */
    this.victimNode = translator.node(data.VictimNode, locale);

    /**
     * The score description
     * @type {?string}
     */
    this.scoreLocTag = data.Fomorian ? 'Fomorian Assault Score' : translator.languageString(data.ScoreLocTag, locale);

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
     * @type {Number}
     */
    this.health =
      typeof data.HealthPct !== 'undefined' ? Number.parseFloat(((data.HealthPct || 0.0) * 100).toFixed(2)) : undefined;

    if (data.JobAffiliationTag) {
      this.affiliatedWith = translator.syndicate(data.JobAffiliationTag, locale);
      if (data.Jobs) {
        this.jobs = (data.Jobs || []).map((j) => new SyndicateJob(j, this.expiry, opts));
        this.previousJobs = (data.PreviousJobs || []).map((j) => new SyndicateJob(j, this.expiry, opts));
      }
    }

    /**
     * Previous job id
     * @type {String}
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
          sender: translator.languageString(msg.sender, locale),
          subject: translator.languageString(msg.subject, locale),
          message: translator.languageString(msg.message, locale),
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
          type: translator.languageString(type, locale),
          progressAmt: Number.parseInt(data.MultiProgress[index], 10),
        };
      });

      /**
       * Total of all MultiProgress
       * @type {Number}
       */
      this.progressTotal = Number.parseFloat(data.MultiProgress.reduce((accumulator, val) => accumulator + val));
    }

    /**
     * Whether or not to show the total score at the end of the mission
     * @type {boolean}
     */
    this.showTotalAtEndOfMission = data.ShowTotalAtEOM;
    /**
     * Whether or not the event is personal
     * @type {Boolean}
     */
    this.isPersonal = data.Personal;
    /**
     * Whether or not the event is community
     * @type {Boolean}
     */
    this.isCommunity = data.Community;

    /**
     * Affectors for this mission
     * @type {string[]}
     */
    this.regionDrops = (data.RegionDrops || []).map((drop) => translator.languageString(drop, locale));

    /**
     * Archwing Drops in effect while this event is active
     * @type {string[]}
     */
    this.archwingDrops = (data.ArchwingDrops || []).map((drop) => translator.languageString(drop, locale));

    this.asString = this.toString();

    /**
     * Metadata provided by DE
     * @type {Object}
     */
    this.metadata = JSON.parse((data.Metadata || '{}').replace('" ', '"'));

    /**
     * Bonuses given for completion
     * @type {Array.<Number>}
     */
    this.completionBonuses = data.CompletionBonus || [];

    this.scoreVar = data.ScoreVar;

    this.altExpiry = timeDate.parseDate(data.AltExpiry);
    this.altActivation = timeDate.parseDate(data.AltActivation);

    this.nextAlt = {
      expiry: timeDate.parseDate(data.NextAltExpiry),
      activation: timeDate.parseDate(data.NextAltActivation),
    };
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * The event's string representation
   * @returns {string}
   */
  toString() {
    let lines = [`${this.description} : ${this.faction}`];

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

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = WorldEvent;
