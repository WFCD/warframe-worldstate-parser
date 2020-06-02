export = ConclaveChallenge;
declare const ConclaveChallenge_base: typeof import("./WorldstateObject.js");
/**
 * Represents a Conclave challenge
 * @extends {WorldstateObject}
 */
declare class ConclaveChallenge extends ConclaveChallenge_base {
    /**
     * @param   {Object}             data            The challenge data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, locale, }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
        locale: string;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The challenge's description text
     * @type {string}
     */
    description: string;
    /**
     * The number of times that the challenge's objective needs to be completed
     * @type {number}
     */
    amount: number;
    /**
     * The PVP mode that the challenge must be completed in
     * @type {string}
     */
    mode: string;
    /**
     * The challenge's category (daily, weekly...)
     * @type {string}
     */
    category: string;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * Whether or not this is a daily conclave challenge.
     * @type {boolean}
     */
    daily: boolean;
    /**
     * Whether or not this is the root challenge
     * @type {boolean}
     */
    rootChallenge: boolean;
    /**
     * the end string
     * @type {string}
     */
    endString: string;
    /**
     * This challenge as a string
     * @type {string}
     */
    asString: string;
    /**
     * Get whether or not the challenge is daily
     * @returns {boolean}
     */
    isDaily(): boolean;
    /**
     * Get whether or not this is the weekly root challenge
     * @returns {boolean}
     */
    isRootChallenge(): boolean;
    /**
     * Get whether or not the challenge has expired
     * @returns {boolean}
     */
    isExpired(): boolean;
}
