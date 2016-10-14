'use strict';

/**
 * Represents a daily deal
 */
class DailyDeal {
  /**
   * @param   {Object} data               The deal data
   * @param   {Object} options.translator The string translator
   * @param   {Object} options.mdConfig   The markdown settings
   * @param   {Object} options.timeDate   The time and date functions
   */
  constructor(data, { translator, mdConfig, timeDate }) {
    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The time and date functions
     * @type {Object}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The item being offered in the sale
     * @type {string}
     */
    this.item = translator.languageString(data.StoreItem);

    /**
     * The expiry date and time
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.Expiry.sec);

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
  }

  /**
   * Returns the deal's ETA string
   * @returns {string}
   */
  getEtaString() {
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
      `Expires in ${this.getEtaString()}`,
    ];
    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = DailyDeal;
