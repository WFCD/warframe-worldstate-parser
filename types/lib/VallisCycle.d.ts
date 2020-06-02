export = VallisCycle;
declare const VallisCycle_base: typeof import("./WorldstateObject.js");
/**
 * Represents the current Earth Day/Night Cycle
 * @extends {WorldstateObject}
 */
declare class VallisCycle extends VallisCycle_base {
    /**
     * @param   {Date}              bountiesEndDate The end date for Ostron bounties
     * @param   {Object}            deps            The dependencies object
     * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
     * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
     */
    constructor({ mdConfig, timeDate }: Date);
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    isWarm: boolean;
    /**
     * Current cycle state. One of `warm`, `cold`
     * @type {string}
     */
    state: string;
    /**
     * Time remaining string
     * @type {string}
     */
    timeLeft: string;
    shortString: string;
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
}
