export = Sortie;
declare const Sortie_base: typeof import("./WorldstateObject.js");
/**
 * Represents a daily sortie
 * @extends {WorldstateObject}
 */
declare class Sortie extends Sortie_base {
    /**
     * @param   {Object}            data               The data for all daily sorties
     * @param   {Object}            deps               The dependencies object
     * @param   {MarkdownSettings}  deps.mdConfig      The markdown settings
     * @param   {Translator}        deps.translator    The string translator
     * @param   {TimeDateFunctions} deps.timeDate      The time and date functions
     * @param   {Object}            deps.sortieData    The data used to parse sorties
     * @param   {SortieVariant}     deps.SortieVariant The sortie variant parser
     * @param   {string}            deps.locale        Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, sortieData, SortieVariant, locale, }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
        sortieData: any;
        SortieVariant: any;
        locale: string;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The sortie's reward pool
     * @type {string}
     */
    rewardPool: string;
    /**
     * The sortie's variants
     * @type {Array.<SortieVariant>}
     */
    variants: Array<any>;
    /**
     * The sortie's boss
     * @type {string}
     */
    boss: string;
    /**
     * The sortie's faction
     * @type {string}
     */
    faction: string;
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Get the sortie's boss
     * @returns {string}
     */
    getBoss(): string;
    /**
     * Get the sortie's faction
     * @returns {string}
     */
    getFaction(): string;
    /**
     * Gets a string indicating how long it will take for the sortie to end
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get whether or not the sortie has expired
     * @returns {boolean}
     */
    isExpired(): boolean;
}
