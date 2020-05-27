export = CetusCycle;
declare const CetusCycle_base: typeof import("./WorldstateObject.js");
/**
 * Represents the current Earth Day/Night Cycle
 * @extends {WorldstateObject}
 */
declare class CetusCycle extends CetusCycle_base {
    /**
     * @param   {Date}              bountiesEndDate The end date for Ostron bounties
     * @param   {Object}            deps            The dependencies object
     * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
     * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
     */
    constructor(bountiesEndDate: Date, { mdConfig, timeDate }: {
        mdConfig: any;
        timeDate: any;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The end of the Ostron bounties timer (marks the end of night)
     * @type {Date}
     * @private
     */
    private bountiesEndDate;
    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    isDay: boolean;
    /**
     * Current cycle state. One of `day`, `night`
     * @type {string}
     */
    state: string;
    /**
     * Time remaining string
     * @type {string}
     */
    timeLeft: string;
    /**
     * Whether or not this is for Cetus Cycle
     * @type {boolean}
     */
    isCetus: boolean;
    shortString: string;
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    getCurrentCetusCycle(): {
        dayTime: boolean;
        timeLeft: any;
        expiry: Date;
        expiresIn: any;
        state: string;
        start: number;
    };
}
