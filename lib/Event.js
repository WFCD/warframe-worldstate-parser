'use strict';

const WorldstateObject = require('./WorldstateObject.js');
const SyndicateJob = require('./SyndicateJob.js');

/**
 * Represents an in-game special event
 * @extends {WorldstateObject}
 */
class Event extends WorldstateObject {
  /**
   * @param   {Object}            data            The event data
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   * @param   {Translator}        deps.translator The string translator
   * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
   * @param   {function}          deps.Reward     The Reward parser
   */
  constructor(data, { mdConfig, translator, timeDate, Reward }) {
    super(data);

    const opts = { translator, mdConfig, Reward, timeDate };

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
    this.maximumScore = data.Goal;

    /**
     * The first intermediate score goal
     * @type {?number}
     */
    this.smallInterval = data.GoalInterim;

    /**
     * The second intermediate score goal
     * @type {?number}
     */
    this.largeInterval = data.GoalInterim2;

    /**
     * The faction that the players must fight in the event
     * @type {string}
     */
    this.faction = translator.faction(data.Faction);

    /**
     * The description of the event
     * @type {string}
     */
    this.description = translator.languageString(data.Desc);

    /**
     * Tooltip for the event
     * @type {?string}
     */
    this.tooltip = translator.languageString(data.ToolTip);

    /**
     * The node where the event takes place
     * @type {?string}
     */
    this.node = translator.node(data.Node);

    /**
     * The other nodes where the event takes place
     * @type {Array.<string>}
     */
    this.concurrentNodes = data.ConcurrentNodes
      ? data.ConcurrentNodes.map(n => translator.node(n))
      : [];

    /**
     * The victim node
     * @type {?string}
     */
    this.victimNode = translator.node(data.VictimNode);

    /**
     * The score description
     * @type {?string}
     */
    this.scoreLocTag = data.Fomorian
      ? 'Fomorian Assault Score'
      : translator.languageString(data.ScoreLocTag);

    /**
     * The event's rewards
     * @type {Array.<Reward>}
     */
    this.rewards = Object.keys(data)
      .filter(k => (k.includes('Reward') || k.includes('reward')))
      .map(k => new Reward(data[k], opts));

    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.getExpired();

    this.health = typeof data.HealthPct !== 'undefined' ?
        ((data.HealthPct || 0.00) * 100).toFixed(2)
        : undefined;

    if (data.JobAffiliationTag) {
      this.affiliatedWith = translator.syndicate(data.JobAffiliationTag);
      if (data.Jobs) {
        this.jobs = (data.Jobs || []).map(j => new SyndicateJob(j, this.expiry, opts));
      }
    }

    this.asString = this.toString();
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
    let lines = [
      `${this.description} : ${this.faction}`,
    ];
    
    if (this.scoreLocTag && this.maximumScore) {
      lines.push(`${this.scoreLocTag} : ${this.maximumScore}`);
    }

    if (this.rewards.length) {
      lines.push('Rewards:');
      lines = lines.concat(this.rewards.map(r => r.toString()));
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

    if (this.affiliatedWith) {
      lines.push(`${this.affiliatedWith} will reward you for performing ` +
        `${this.jobs.map(job => job.type).join(", ")} job${this.jobs.length > 1 ? 's' : ''}`);
    }

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = Event;
