export = FlashSale;
/**
 * Represents a flash sale
 */
declare class FlashSale {
    /**
     * @param   {Object}             data            The flash sale data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { translator, mdConfig, timeDate, locale, }: {
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
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    private timeDate;
    /**
     * The item being offered in the flash sale
     * @type {string}
     */
    item: string;
    /**
     * The date and time at which the sale will end
     * @type {Date}
     */
    expiry: Date;
    /**
     * The date and time at which the sale will or did start
     * @type {Date}
     */
    activation: Date;
    /**
     * The item's discount percentage
     * @type {number}
     */
    discount: number;
    /**
     * The item's discounted credit price
     * @type {number}
     */
    regularOverride: number;
    /**
     * The item's discounted platinum price
     * @type {number}
     */
    premiumOverride: number;
    /**
     * Whether this item is show in the in-game market
     * @type {boolean}
     */
    isShownInMarket: boolean;
    /**
     * Whether this item is featured in the in-game market
     * @type {boolean}
     */
    isFeatured: boolean;
    /**
     * Whether this item is marked as popular in the in-game market
     * @type {boolean}
     */
    isPopular: boolean;
    /**
     * Unique identifier for this sale built from the end time and reward
     * @type {string}
     */
    id: string;
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
     * Get how much time is left before the deal expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get whether or not this deal has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * Returns a string representation of the flash sale
     * @returns {string}
     */
    toString(): string;
}
