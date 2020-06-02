export = DailyDeal;
/**
 * Represents a daily deal
 */
declare class DailyDeal {
    /**
     * @param   {Object}            data            The deal data
     * @param   {Object}            deps            The dependencies object
     * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
     * @param   {Translator}        deps.translator The string translator
     * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
     * @param   {string}            deps.locale     Locale to use for translations
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
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    private timeDate;
    /**
     * The item that is being offered in the sale
     * @type {string}
     */
    item: string;
    /**
     * The date and time at which the deal will expire
     * @type {Date}
     */
    expiry: Date;
    /**
     * The date and time at which the deal will or did start
     * @type {Date}
     */
    activation: Date;
    /**
     * The item's original price
     * @type {number}
     */
    originalPrice: number;
    /**
     * The item's discounted price
     * @type {number}
     */
    salePrice: number;
    /**
     * The number of available items on sale
     * @type {number}
     */
    total: number;
    /**
     * The number of items that have already been sold
     * @type {number}
     */
    sold: number;
    /**
     * Unique identifier for this deal built from the end time and item
     * @type {string}
     */
    id: string;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Percent discount
     * @type {number}
     */
    discount: number;
    /**
     * Get a string indicating how much time is left before the deal expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Returns a string representation of the daily deal
     * @returns {string}
     */
    toString(): string;
}
