import {
  type ContentTimestamp,
  parseDate,
} from 'warframe-worldstate-data/utilities';

import type { Identifier } from './WorldStateObject';

export interface RawDarkSectorBattle {
  Def: string;
  DefAli: boolean;
  Att: string;
  AttAli: boolean;
  DefId: Identifier;
  WinId: Identifier;
  Start: ContentTimestamp;
  End: ContentTimestamp;
}

/**
 * Represents a battle over a dark sector
 */
export class DarkSectorBattle {
  /**
   * The defenders of the dark sector
   */
  defender: string;

  /**
   * Whether the defenders are an alliance or not
   */
  defenderIsAlliance: boolean;

  /**
   * The attackers of the dark sector
   */
  attacker: string;

  /**
   * Whether the attackers are an alliance or not
   */
  attackerIsAlliance: boolean;

  /**
   * The winner of the battle
   */
  winner: string;

  /**
   * The date and time at which the battle started
   */
  start: Date;

  /**
   * The date and time at which the battle ended
   */
  end: Date;

  /**
   * @param data The battle data
   */
  constructor(data: RawDarkSectorBattle) {
    this.defender = data.Def;

    this.defenderIsAlliance = data.DefAli;

    this.attacker = data.Att;

    this.attackerIsAlliance = data.AttAli;

    const defId = data.DefId.$oid || data.DefId.$id;
    const winId = data.WinId.$oid || data.WinId.$id;

    this.winner = defId === winId ? this.defender : this.attacker;

    this.start = parseDate(data.Start);

    this.end = parseDate(data.End);
  }
}
