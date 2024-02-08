import WorldstateObject from './WorldstateObject.js';
import { node, languageString, faction } from '../utilities/translation.js';
import Reward from './Reward.js';
import { parseDate, timeDeltaToString, toNow } from '../utilities/timeDate.js';
import mdConfig from '../supporting/MarkdownSettings.js';
/**
 * An invasion participant
 * @typedef {Object} InvasionParticipant
 * @property {string} reward Reward for supporting this participant in the invasion
 * @property {string} faction Faction of this participant (localized)
 * @property {string} factionKey Faction of this participant (always English)
 */

/**
 * Represents an invasion
 */
export default class Invasion extends WorldstateObject {
  /**
   * @param   {Object}             data            The invasion data
   * @param   {Dependency}         deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    const opts = {
      locale,
    };

    /**
     * The node where the invasion is taking place
     * @type {string}
     */
    this.node = node(data.Node, locale);

    /**
     * The node key where the invasion is taking place
     * @type {string}
     */
    this.nodeKey = node(data.Node);

    /**
     * The invasion's description
     * @type {string}
     */
    this.desc = languageString(data.LocTag, locale);

    /**
     * The attacking faction
     * @type {string}
     */
    this.attackingFaction = faction(data.DefenderMissionInfo.faction, locale);

    /**
     * Invasion attacker
     * @type {InvasionParticipant}
     */
    this.attacker = {
      reward: Object.keys(data?.AttackerReward || {})?.length ? new Reward(data.AttackerReward, opts) : undefined,
      faction: faction(data.DefenderMissionInfo.faction, locale),
      factionKey: faction(data.DefenderMissionInfo.faction, 'en'),
    };

    /**
     * Invasion defender
     * @type {InvasionParticipant}
     */
    this.defender = {
      reward: Object.keys(data?.DefenderReward || {})?.length ? new Reward(data.DefenderReward, opts) : undefined,
      faction: faction(data.AttackerMissionInfo.faction, locale),
      factionKey: faction(data.AttackerMissionInfo.faction, 'en'),
    };

    /**
     * Whether this invasion is against the infestation
     * @type {boolean}
     */
    this.vsInfestation = /infest/i.test(data.DefenderMissionInfo.faction);

    /**
     * The time at which the invasion starts
     * @type {Date}
     */
    this.activation = parseDate(data.Activation);

    /**
     * The signed count of completed runs. Supporting the attackers makes the count go up,
     * supporting the defenders makes it go down
     * @type {number}
     */
    this.count = data.Count;

    /**
     * The number of runs that one side needs to win
     * @type {number}
     */
    this.requiredRuns = data.Goal;

    /**
     * The invasion's completion percentage. Defenders win if it gets to 0
     * Grineer vs. Corpus invasions start at 50, Infested invasions start at 100
     * @type {number}
     */
    this.completion = (1 + data.Count / data.Goal) * (this.vsInfestation ? 100 : 50);

    /**
     * Whether the invasion has finished
     * @type {boolean}
     */
    this.completed = data.Completed;

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();

    /**
     * An array containing the types of all of the invasions's rewards
     * @type {Array.<string>}
     */
    this.rewardTypes = this.getRewardTypes();
  }

  /**
   * Whether or not the attackers are winning.
   * This is always false when the infestation is attacking
   * @returns {boolean}
   */
  isAttackerWinning() {
    return this.count > 0;
  }

  /**
   * Get an estimation of how much time is left before the invasion ends in milliseconds
   * @returns {number}
   */
  getRemainingTime() {
    const completedRuns = Math.abs(this.count);
    const elapsedMillis = toNow(this.activation);
    const remainingRuns = this.requiredRuns - completedRuns;
    return remainingRuns * (elapsedMillis / completedRuns);
  }

  /**
   * Get a string estimating how much time is left before the invasion ends
   * @returns {string}
   */
  getETAString() {
    return timeDeltaToString(this.getRemainingTime());
  }

  /**
   * Get the types of the items being rewarded in the invasion
   * @returns {Array.<string>}
   */
  getRewardTypes() {
    return [...(this.attacker.reward?.getTypes() ?? []), ...(this.defender.reward?.getTypes() ?? [])];
  }

  /**
   * The invasion's string representation
   * @returns {string}
   */
  toString() {
    let lines = [];
    if (this.vsInfestation) {
      lines = [
        this.defender.reward?.toString(),
        `${this.desc} on ${this.node}`,
        `${Math.round(this.completion * 100) / 100}% - ETA: ${this.getETAString()}`,
      ].filter(Boolean);
    } else {
      lines = [
        `${this.attackingFaction} (${this.attacker.reward}) vs. ${this.defender.faction} (${this.defender.reward})`,
        `${this.node} - ${this.desc}`,
        `${Math.round(this.completion * 100) / 100}% - ETA: ${this.getETAString()}`,
      ];
    }
    return `${mdConfig.codeBlock}${lines.join(mdConfig.lineEnd)}${mdConfig.blockEnd}`;
  }
}
