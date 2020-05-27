export = EarthCycle;
declare const EarthCycle_base: typeof import("./WorldstateObject.js");
/**
 * Represents the current Earth Day/Night Cycle
 * @extends {WorldstateObject}
 */
declare class EarthCycle extends EarthCycle_base {
    /**
     * @param   {Object}            data            The event data
     * @param   {Object}            deps            The dependencies object
     * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
     */
    constructor({ mdConfig, timeDate }: any);
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
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
}
