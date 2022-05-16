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
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { translator, mdConfig, timeDate, locale }) {
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
    this.item = translator.languageString(data.TypeName, locale);

    /**
     * The date and time at which the sale will end
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.EndDate);

    /**
     * The date and time at which the sale will or did start
     * @type {Date}
     */
    this.activation = timeDate.parseDate(data.StartDate);

    /**
     * The item's discount percentage
     * @type {number}
     */
    this.discount = data.Discount;

    /**
     * The item's discounted credit price
     * @type {number}
     */
    this.regularOverride = data.RegularOverride;

    /**
     * The item's discounted platinum price
     * @type {number}
     */
    this.premiumOverride = data.PremiumOverride;

    /**
     * Whether this item is show in the in-game market
     * @type {boolean}
     */
    this.isShownInMarket = data.ShowInMarket;

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

    /**
     * Unique identifier for this sale built from the end time and reward
     * @type {string}
     */
    this.id = `${data.TypeName.split('/').slice(-1)[0]}${this.expiry.getTime()}`;

    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    this.expired = this.getExpired();

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();
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
   * Get whether or not this deal has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * Returns a string representation of the flash sale
   * @returns {string}
   */
  toString() {
    const lines = [`${this.item}, ${this.premiumOverride}p`, `Expires in ${this.getETAString()}`];

    if (this.discount) {
      lines.unshift(`${this.discount}% off!`);
    } else if (this.isShownInMarket) {
      lines.unshift('**ShowInMarket**');
    } else if (this.isPopular) {
      lines.unshift('**Popular**');
    } else if (this.isFeatured) {
      lines.unshift('**Featured**');
    }

    return `${this.mdConfig.codeMulti}${lines.join(this.mdConfig.lineEnd)}${this.mdConfig.blockEnd}`;
  }
}

module.exports = FlashSale;
