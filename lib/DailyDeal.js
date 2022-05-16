'use strict';

/**
 * Represents a daily deal
 */
class DailyDeal {
  /**
   * @param   {Object}            data            The deal data
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   * @param   {Translator}        deps.translator The string translator
   * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
   * @param   {string}            deps.locale     Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, locale }) {
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The item that is being offered in the sale
     * @type {string}
     */
    this.item = translator.languageString(data.StoreItem, locale);

    /**
     * The date and time at which the deal will expire
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.Expiry);

    /**
     * The date and time at which the deal will or did start
     * @type {Date}
     */
    this.activation = timeDate.parseDate(data.Activation);

    /**
     * The item's original price
     * @type {number}
     */
    this.originalPrice = data.OriginalPrice;

    /**
     * The item's discounted price
     * @type {number}
     */
    this.salePrice = data.SalePrice;

    /**
     * The number of available items on sale
     * @type {number}
     */
    this.total = data.AmountTotal;

    /**
     * The number of items that have already been sold
     * @type {number}
     */
    this.sold = data.AmountSold;

    /**
     * Unique identifier for this deal built from the end time and item
     * @type {string}
     */
    this.id = `${data.StoreItem.split('/').slice(-1)[0]}${this.expiry.getTime()}`;

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();

    /**
     * Percent discount
     * @type {number}
     */
    this.discount = data.Discount;
  }

  /**
   * Get a string indicating how much time is left before the deal expires
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the daily deal
   * @returns {string}
   */
  toString() {
    const lines = [
      `Daily Deal: ${this.item}`,
      `${this.salePrice}p (original ${this.originalPrice}p)`,
      `${this.sold} / ${this.total} sold`,
      `Expires in ${this.getETAString()}`,
    ];
    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = DailyDeal;
