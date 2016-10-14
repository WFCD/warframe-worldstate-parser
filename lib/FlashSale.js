'use strict';

/**
 * Represents a flash sale
 */
class FlashSale {
  /**
   * @param   {Object} data                       The flash sale data
   * @param   {Object} options.translator         The string translator
   * @param   {Object} options.mdConfig           The markdown settings
   * @param   {Object} options.timeDate           The time and date functions
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
     * The item being offered in the flash sale
     * @type {string}
     */
    this.item = translator.languageString(data.TypeName);

    /**
     * The date and time at which the sale will end
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.EndDate.sec);

    /**
     * The item's discount percentage
     * @type {number}
     */
    this.discount = data.Discount;

    /**
     * The item's discounted platinum price
     * @type {number}
     */
    this.premiumOverride = data.PremiumOverride;

    /**
     * Whether this item is featured in the in-game market
     * @type {Boolean}
     */
    this.isFeatured = data.Featured;

    /**
     * Whether this item is marked as popular in the in-game market
     * @type {Boolean}
     */
    this.isPopular = data.Popular;
  }

  /**
   * Returns how much time is left before the deal expires
   * @returns {string}
   */
  getETAString() {
    const timeDelta = this.timeDate.fromNow(this.expiry);
    return this.timeDate.timeDeltaToString(timeDelta);
  }

  /**
   * Returns a string representation of the flash sale
   * @returns {string}
   */
  toString() {
    const lines = [
      `${this.item}, ${this.premiumOverride}p`,
      `Expires in ${this.getETAString()}`,
    ];

    if (this.discount) {
      lines.unshift(`${this.discount}% off!`);
    } else if (this.isPopular) {
      lines.unshift('**Popular**');
    } else if (this.isFeatured) {
      lines.unshift('**Featured**');
    }

    return `${this.mdConfig.codeMulti}${lines.join(this.mdConfig.lineEnd)}${this.mdConfig.blockEnd}`;
  }
}

module.exports = FlashSale;
