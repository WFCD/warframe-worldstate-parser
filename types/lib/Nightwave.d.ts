export = Nightwave;
declare const Nightwave_base: typeof import("./WorldstateObject.js");
/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
declare class Nightwave extends Nightwave_base {
    /**
     * @param   {Object}             data            The alert data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {Mission}            deps.Mission    The Mission parser
     * @param   {Reward}             deps.Reward     The Reward parser
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, Mission, Reward, locale, }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
        Mission: any;
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
     * The current season. 0-indexed.
     * @type {Number}
     */
    season: number;
    /**
     * Descriptor for affiliation
     * @type {string}
     */
    tag: string;
    /**
     * The current season's current phase. 0-indexed.
     * @type {Number}
     */
    phase: number;
    /**
     * Misc params provided.
     * @type {Object}
     */
    params: any;
    possibleChallenges: any;
    activeChallenges: any;
    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    rewardTypes: Array<string>;
    /**
     * Get a string indicating how much time is left before the alert expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get an array containing the types of all of the nightwave season's rewards
     * @returns {Array.<string>}
     */
    getRewardTypes(): Array<string>;
}
