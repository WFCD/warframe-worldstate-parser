export = SyndicateJob;
declare const SyndicateJob_base: typeof import("./WorldstateObject.js");
/**
 * Represents a syndicate daily mission
 * @extends {WorldstateObject}
 */
declare class SyndicateJob extends SyndicateJob_base {
    /**
     * @param   {Object}             data            The syndicate mission data
     * @param   {Date}               expiry          The syndicate job expiration
     * @param   {Object}             deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, expiry: Date, { translator, timeDate, locale }: {
        translator: any;
        locale: string;
    });
    /**
     * Array of strings describing rewards
     * @type {Array.<String>}
     */
    rewardPool: Array<string>;
    /**
     * The type of job this is
     * @type {String}
     */
    type: string;
    /**
     * Array of enemy levels
     * @type {Array.<number>}
     */
    enemyLevels: Array<number>;
    /**
     * Array of standing gains per stage of job
     * @type {Array.<number>}
     */
    standingStages: Array<number>;
    /**
     * Minimum mastery required to participate
     * @type {Number}
     */
    minMR: number;
}
