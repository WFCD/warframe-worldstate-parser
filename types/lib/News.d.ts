export = News;
declare const News_base: typeof import("./WorldstateObject.js");
/**
 * Represents a game news item
 * @extends {WorldstateObject}
 */
declare class News extends News_base {
    /**
     * @param   {Object}             data            The news data
     * @param   {Dependency}         deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {locale}             deps.locale     Locale to use for determining language
     */
    constructor(data: any, { mdConfig, timeDate, locale }: any);
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The news message
     * @type {string}
     */
    message: string;
    /**
     * The link to the forum post
     * @type {string}
     */
    link: string;
    /**
     * The news's image link
     * @type {string}
     */
    imageLink: string;
    /**
     * Whether this has priority over other news or not
     * @type {boolean}
     */
    priority: boolean;
    /**
     * The date at which the post was published
     * @type {Date}
     */
    date: Date;
    /**
     * The date at which the event starts
     * @type {?Date}
     */
    startDate: Date | null;
    /**
     * The date at which the event ends
     * @type {?Date}
     */
    endDate: Date | null;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Whther or not this is an update news item
     * @type {boolean}
     */
    update: boolean;
    /**
     * Whther or not this is a prime access news item
     * @type {boolean}
     */
    primeAccess: boolean;
    /**
     * Whether or not this is a stream
     * @type {boolean}
     */
    stream: boolean;
    /**
     * Translation of the news item
     * @type {Object.<string, string>}
     */
    translations: {
        [x: string]: string;
    };
    /**
     * The string representation of this object at creation
     * @type {string}
     */
    asString: string;
    /**
     * Get a string indicating how long it will take for the event to start or
     * how long it's been since the news went up
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Whether or not this is about a game update
     * @returns {boolean}
     */
    isUpdate(): boolean;
    /**
     * Whether or not this is about a new Prime Access
     * @returns {boolean}
     */
    isPrimeAccess(): boolean;
    /**
     * Whether or not this is about a new Prime Access
     * @returns {boolean}
     */
    isStream(): boolean;
    /**
    * The title of the news item in the specified language
    * @param {string} langCode Ex. 'es', 'de', 'fr'
    * @returns {string}
    */
    getTitle(langCode: string): string;
}
