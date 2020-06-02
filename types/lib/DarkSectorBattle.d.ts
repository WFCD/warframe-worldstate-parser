export = DarkSectorBattle;
/**
 * Represents a battle over a dark sector
 */
declare class DarkSectorBattle {
    /**
     * @param   {Object} data The battle data
     */
    constructor(data: any, { timeDate }: {
        timeDate: any;
    });
    /**
     * The defenders of the dark sector
     * @type {string}
     */
    defender: string;
    /**
     * Whether the defenders are an alliance or not
     * @type {boolean}
     */
    defenderIsAlliance: boolean;
    /**
     * The attackers of the dark sector
     * @type {string}
     */
    attacker: string;
    /**
     * Whether the attackers are an alliance or not
     * @type {boolean}
     */
    attackerIsAlliance: boolean;
    /**
     * The winner of the battle
     * @type {string}
     */
    winner: string;
    /**
     * The date and time at which the battle started
     * @type {Date}
     */
    start: Date;
    /**
     * The date and time at which the battle ended
     * @type {Date}
     */
    end: Date;
}
