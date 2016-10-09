'use strict';

const mdDefault = require('node-md-config');
const WorldstateObject = require('./WorldstateObject.js');
const Reward = require('./Reward.js');
const defaultTranslator = require('./translation.js');

/**
 * Represents an in-game special event
 * @extends {WorldstateObject}
 */
class Event extends WorldstateObject {
  /**
   * @param   {Object} data                          The event data
   * @param   {Object} [options.translator]          The string translator
   * @param   {Object.<string, string>} [options.md] The markdown settings
   * @param   {Object} [options.RewardParser]        The Reward parser
   */
  constructor(data, { translator = defaultTranslator, md = mdDefault,
    RewardParser = Reward } = {}) {
    super(data);

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = md;

    /**
     * The expiry date and time
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.Expiry.sec);

    /**
     * The score goal
     * @type {number}
     */
    this.maximumScore = data.Goal;

    /**
     * The first intermediate goal
     * @type {?number}
     */
    this.smallInterval = data.GoalInterim || null;

    /**
     * The second intermediate goal
     * @type {?number}
     */
    this.largeInterval = data.GoalInterim2 || null;

    /**
     * The faction that the players must fight
     * @type {string}
     */
    this.faction = translator.faction(data.Faction);

    /**
     * The description of the event
     * @type {string}
     */
    this.description = translator.languageString(data.Desc);

    /**
     * The node where the event takes place
     * @type {?string}
     */
    this.node = translator.node(data.Node) || null;

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
    this.victimNode = translator.node(data.VictimNode) || null;

    /**
     * The score description
     * @type {?string}
     */
    this.scoreLocTag = data.Fomorian
      ? 'Fomorian Assault Score'
      : translator.languageString(data.ScoreLocTag) || null;

    /**
     * The event rewards
     * @type {Array.<Reward>}
     */
    this.rewards = Object.keys(data)
      .filter(k => k.includes('Reward'))
      .map(k => new RewardParser(data[k]));
  }

  /**
   * Whether or not the event has expired
   * @readonly
   * @type {boolean}
   */
  get expired() {
    return this.expiry.getTime() < Date.now();
  }

  /**
   * The event's string representation
   * @returns {string}
   */
  toString() {
    let lines = [
      `${this.description} : ${this.faction}`,
      `${this.scoreLocTag} : ${this.maximumScore}`,
    ];

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

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = Event;
