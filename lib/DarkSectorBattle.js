'use strict';

/**
 * Represents a battle over a dark sector
 */
class DarkSectorBattle {
  /**
   * @param   {Object} data The battle data
   */
  constructor(data) {
    /**
     * The defenders of the dark sector
     * @type {string}
     */
    this.defender = data.Def;

    /**
     * Whether the defenders are an alliance or not
     * @type {boolean}
     */
    this.defenderIsAlliance = data.DefAli;

    /**
     * The attackers of the dark sector
     * @type {string}
     */
    this.attacker = data.Att;

    /**
     * Whether the attackers are an alliance or not
     * @type {boolean}
     */
    this.attackerIsAlliance = data.AttAli;

    /**
     * The winner of the battle
     * @type {string}
     */
    this.winner = data.DefId.$id === data.WinId.$id ? this.defender : this.attacker;

    /**
     * The date and time at which the battle started
     * @type {Date}
     */
    this.start = new Date(1000 * data.Start.sec);

    /**
     * The date and time at which the battle ended
     * @type {Date}
     */
    this.end = new Date(1000 * data.End.sec);
  }
}

module.exports = DarkSectorBattle;
