'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents an invasion
 */
class Invasion extends WorldstateObject {
  /**
   * @param   {Object}                  data                 The invasion data
   * @param   {Object}                  options.translator   The string translator
   * @param   {function}                options.Mission      The mission parser
   * @param   {function}                options.Reward       The reward parser
   * @param   {Object.<string, string>} options.mdConfig     The markdown settings
   */
  constructor(data, { translator, Mission, Reward, mdConfig, timeDate }) {
    super(data);

    const opts = { translator, Mission, Reward, mdConfig, timeDate };

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The function used to format a time difference
     * @type {Function}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The node where the invasion is taking place
     * @type {string}
     */
    this.node = translator.node(data.Node);

    /**
     * The invasion's description
     * @type {string}
     */
    this.desc = translator.languageString(data.LocTag);

    /**
     * The attacker's mission
     * @type {Mission}
     */
    // NOT A TYPO
    this.attackerMission = new Mission(data.DefenderMissionInfo, opts);

    /**
     * The defender's mission
     * @type {Mission}
     */
    // NOT A TYPO
    this.defenderMission = new Mission(data.AttackerMissionInfo, opts);

    /**
     * Whether this invasion is against the infestation
     * @type {boolean}
     */
    this.vsInfestation = /infest/i.test(this.getAttackingFaction());

    /**
     * The time at which the invasion started
     * @type {Date}
     */
    this.activation = new Date(1000 * data.Activation.sec);

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
    this.completion = (1 + (data.Count / data.Goal)) * (this.vsInfestation ? 100 : 50);
  }

  /**
   * The attacking faction
   * @returns {string}
   */
  getAttackingFaction() {
    return this.attackerMission.faction;
  }

  /**
   * The defending faction
   * @returns {string}
   */
  getDefendingFaction() {
    return this.defenderMission.faction;
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
   * Returns the estimated remaining time in milliseconds
   * @returns {number}
   */
  getRemainingTime() {
    const completedRuns = Math.abs(this.count);
    const elapsedMillis = this.timeDate.toNow(this.activation);
    const remainingRuns = this.requiredRuns - completedRuns;
    return remainingRuns * (elapsedMillis / completedRuns);
  }

  /**
   * The ETA string
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.getRemainingTime());
  }

  /**
   * The types of the items being rewarded in the invasion
   * @returns {Array.<string>}
   */
  getRewardTypes() {
    return this.attackerMission.reward.getTypes();
  }

  /**
   * The invasion's string representation
   * @returns {string}
   */
  toString() {
    let lines = [];
    if (this.vsInfestation) {
      lines = [
        this.defenderMission.reward.toString(),
        `${this.desc} (${this.defenderMission.type} on ${this.node})`,
        `${Math.round(this.completion * 100) / 100}% - ETA: ${this.getETAString()}`,
      ];
    } else {
      lines = [
        `${this.getAttackingFaction()} (${this.attackerMission.type}, ${this.attackerMission.reward}) vs. ` +
        `${this.getDefendingFaction()} (${this.defenderMission.type}, ${this.defenderMission.reward})`,
        `${this.node} - ${this.desc}`,
        `${Math.round(this.completion * 100) / 100}% - ETA: ${this.getETAString()}`,
      ];
    }
    return `${this.mdConfig.codeMulti}${lines.join(this.mdConfig.lineEnd)}${this.mdConfig.blockEnd}`;
  }
}

module.exports = Invasion;
