'use strict';

/**
 * Represents a flash sale
 */
class FlashSale {
  /**
   * @param   {Object}             data            The flash sale data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   */
  constructor(data, { translator, mdConfig, timeDate }) {
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
     * The item being offered in the flash sale
     * @type {string}
     */
    this.item = translator.languageString(data.TypeName);

    /**
     * The date and time at which the sale will end
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.EndDate);

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
     * @type {boolean}
     */
    this.isFeatured = data.Featured;

    /**
     * Whether this item is marked as popular in the in-game market
     * @type {boolean}
     */
    this.isPopular = data.Popular;
  }

  /**
   * Get how much time is left before the deal expires
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
