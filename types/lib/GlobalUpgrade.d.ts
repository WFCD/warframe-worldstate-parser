export = GlobalUpgrade;
/**
 * Represents an upgrade that applies to all players
 */
declare class GlobalUpgrade {
    /**
     * @param   {Object}             data            The global upgrade data
     * @param   {Object}             deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { translator, timeDate, mdConfig, locale, }: {
        translator: any;
        timeDate: any;
        mdConfig: any;
        locale: string;
    });
    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    private timeDate;
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The time and date at which the global upgrade starts being active
     * @type {Date}
     */
    start: Date;
    /**
     * The time and date at which the global upgrade stops being active
     * @type {Date}
     */
    end: Date;
    /**
     * The effect of the upgrade
     * @type {string}
     */
    upgrade: string;
    /**
     * The operation type
     * @type {string}
     */
    operation: string;
    /**
     * Symbol for operation
     * @type {string}
     */
    operationSymbol: string;
    /**
     * The operation value
     * @type {string}
     */
    upgradeOperationValue: string;
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
     * Plaintext description of upgrade
     * @type {string}
     */
    desc: string;
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * Get a string indicating how long it will take for the upgrade to expire
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Turn the global upgrade into a plain text description
     * @returns {string} Descriptio
     */
    compileDesription(): string;
    /**
     * Returns a string representation of the upgrade
     * @returns {string}
     */
    toString(): string;
}
