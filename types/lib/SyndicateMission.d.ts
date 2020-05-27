export = SyndicateMission;
declare const SyndicateMission_base: typeof import("./WorldstateObject.js");
/**
 * Represents a syndicate daily mission
 * @extends {WorldstateObject}
 */
declare class SyndicateMission extends SyndicateMission_base {
    /**
     * @param   {Object}             data            The syndicate mission data
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
     * The translation functions
     * @type {Translator}
     * @private
     */
    private translator;
    /**
     * The syndicate that is offering the mission
     * @type {string}
     */
    syndicate: string;
    /**
     * The nodes on which the missions are taking place
     * @type {Array.<string>}
     */
    nodes: Array<string>;
    /**
     * The jobs for this syndicate. Will normally be []
     * @type {Array.<SyndicateJob>}
     */
    jobs: Array<import("./SyndicateJob.js")>;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Get a string indicating how much time is left before the syndicate mission expries
     * @returns {string}
     */
    getETAString(): string;
}
