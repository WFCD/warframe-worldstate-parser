export = Invasion;
declare const Invasion_base: typeof import("./WorldstateObject.js");
/**
 * Represents an invasion
 */
declare class Invasion extends Invasion_base {
    /**
     * @param   {Object}             data            The invasion data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {Reward}             deps.Reward     The Reward parser
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, Reward, locale, }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
        Reward: any;
        locale: string;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The node where the invasion is taking place
     * @type {string}
     */
    node: string;
    /**
     * The invasion's description
     * @type {string}
     */
    desc: string;
    /**
     * The attacker's reward
     * @type {Reward}
     */
    attackerReward: any;
    /**
     * The attacking faction
     * @type {string}
     */
    attackingFaction: string;
    /**
     * The defender's reward
     * @type {Reward}
     */
    defenderReward: any;
    /**
     * The defending faction
     * @type {string}
     */
    defendingFaction: string;
    /**
     * Whether this invasion is against the infestation
     * @type {boolean}
     */
    vsInfestation: boolean;
    /**
     * The signed count of completed runs. Supporting the attackers makes the count go up,
     * supporting the defenders makes it go down
     * @type {number}
     */
    count: number;
    /**
     * The number of runs that one side needs to win
     * @type {number}
     */
    requiredRuns: number;
    /**
     * The invasion's completion percentage. Defenders win if it gets to 0
     * Grineer vs. Corpus invasions start at 50, Infested invasions start at 100
     * @type {number}
     */
    completion: number;
    /**
     * Whether the invasion has finished
     * @type {boolean}
     */
    completed: boolean;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    rewardTypes: Array<string>;
    /**
     * Whether or not the attackers are winning.
     * This is always false when the infestation is attacking
     * @returns {boolean}
     */
    isAttackerWinning(): boolean;
    /**
     * Get an estimation of how much time is left before the invasion ends in milliseconds
     * @returns {number}
     */
    getRemainingTime(): number;
    /**
     * Get a string estimating how much time is left before the invasion ends
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get the types of the items being rewarded in the invasion
     * @returns {Array.<string>}
     */
    getRewardTypes(): Array<string>;
}
