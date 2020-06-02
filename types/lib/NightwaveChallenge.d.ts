export = NightwaveChallenge;
declare const NightwaveChallenge_base: typeof import("./WorldstateObject.js");
/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
declare class NightwaveChallenge extends NightwaveChallenge_base {
    /**
     * @param   {Object}             data            The alert data
     * @param   {Object}             deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { translator, timeDate, locale, }: {
        translator: any;
        timeDate: any;
        locale: string;
    });
    /**
     * Whether or not this is a daily challenge
     * @type {Boolean}
     */
    isDaily: boolean;
    /**
     * Whether or not the challenge is an elite challenge
     * @type {Boolean}
     */
    isElite: boolean;
    /**
     * The descriptor for this challenge
     * @type {string}
     */
    desc: string;
    /**
     * The title for this challenge
     * @type {string}
     */
    title: string;
    /**
     * Reputation reward for ranking up in the Nightwave
     * @type {Number}
     */
    reputation: number;
}
