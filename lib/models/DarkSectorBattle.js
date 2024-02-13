import { parseDate } from 'warframe-worldstate-data/utilities';

/**
 * Represents a battle over a dark sector
 */
export default class DarkSectorBattle {
  /**
   * @param   {object} data The battle data
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

    const defId = data.DefId.$oid || data.DefId.$id;
    const winId = data.WinId.$oid || data.WinId.$id;

    /**
     * The winner of the battle
     * @type {string}
     */
    this.winner = defId === winId ? this.defender : this.attacker;

    /**
     * The date and time at which the battle started
     * @type {Date}
     */
    this.start = parseDate(data.Start);

    /**
     * The date and time at which the battle ended
     * @type {Date}
     */
    this.end = parseDate(data.End);
  }
}
