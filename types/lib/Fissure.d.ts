export = Fissure;
declare const Fissure_base: typeof import("./WorldstateObject.js");
/**
 * Represents a fissure mission
 * @extends {WorldstateObject}
 */
declare class Fissure extends Fissure_base {
    /**
     * @param   {Object}             data            The fissure data
     * @param   {Object}             deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { translator, timeDate, locale }: {
        translator: any;
        timeDate: any;
        locale: string;
    });
    /**
     * The node where the fissure has appeared
     * @type {string}
     */
    node: string;
    /**
     * The fissure mission type
     * @type {string}
     */
    missionType: string;
    /**
     * The faction controlling the node where the fissure has appeared
     * @type {string}
     */
    enemy: string;
    /**
     * The fissure's tier
     * @type {string}
     */
    tier: string;
    /**
     * The fissure's tier as a number
     * @type {number}
     */
    tierNum: number;
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
     * Get whether or not this deal has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * Get a string representation of how long the void fissure will remain active
     * @returns {string}
     */
    getETAString(): string;
}
