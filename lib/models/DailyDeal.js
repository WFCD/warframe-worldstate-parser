import mdConfig from '../supporting/MarkdownSettings.js';
import { languageString } from '../utilities/translation.js';
import { parseDate, timeDeltaToString, fromNow } from '../utilities/timeDate.js';

/**
 * Represents a daily deal
 */
export default class DailyDeal {
  /**
   * @param   {object}            data            The deal data
   * @param   {object}            deps            The dependencies object
   * @param   {string}            deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    /**
     * The item that is being offered in the sale
     * @type {string}
     */
    this.item = languageString(data.StoreItem, locale);

    /**
     * The uniqueName for the item on sale.
     * @type {string}
     */
    this.uniqueName = data.StoreItem;

    /**
     * The date and time at which the deal will expire
     * @type {Date}
     */
    this.expiry = parseDate(data.Expiry);

    /**
     * The date and time at which the deal will or did start
     * @type {Date}
     */
    this.activation = parseDate(data.Activation);

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
     * @type {string}
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
   * @returns {string} estimated time remaining on the deal
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the daily deal
   * @returns {string} The string representation of the daily deal
   */
  toString() {
    const lines = [
      `Daily Deal: ${this.item}`,
      `${this.salePrice}p (original ${this.originalPrice}p)`,
      `${this.sold} / ${this.total} sold`,
      `Expires in ${this.getETAString()}`,
    ];
    return lines.join(mdConfig.lineEnd);
  }
}
