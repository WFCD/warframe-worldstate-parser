export = Alert;
declare const Alert_base: typeof import("./WorldstateObject.js");
/**
 * Represents an alert
 * @extends {WorldstateObject}
 */
declare class Alert extends Alert_base {
    /**
     * @param   {Object}             data       The alert data
     * @param   {MarkdownSettings}   mdConfig   The markdown settings
     * @param   {Translator}         translator The string translator
     * @param   {TimeDateFunctions}  timeDate   The time and date functions
     * @param   {Mission}            Mission    The Mission parser
     * @param   {Reward}             Reward     The Reward parser
     * @param   {string}             locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, Mission, Reward, locale, }: any);
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The mission that the players have to complete
     * @type {Mission}
     */
    mission: any;
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
     * A tag that DE occasionally provides, such as `LotusGift`
     * @type {String}
     */
    tag: string;
    /**
     * Get the alert's description text
     * @returns {string}
     */
    getDescription(): string;
    /**
     * Get the alert's reward
     * @returns {Reward}
     */
    getReward(): any;
    /**
     * Get a string indicating how much time is left before the alert expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get an array containing the types of all of the alert's rewards
     * @returns {Array.<string>}
     */
    getRewardTypes(): Array<string>;
}
