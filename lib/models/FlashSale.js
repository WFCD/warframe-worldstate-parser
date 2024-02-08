import mdConfig from '../supporting/MarkdownSettings.js';
import { languageString } from '../utilities/translation.js';
import { parseDate, fromNow, timeDeltaToString } from '../utilities/timeDate.js';

/**
 * Represents a flash sale
 */
export default class FlashSale {
  /**
   * @param   {Object}             data            The flash sale data
   * @param   {Dependency}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    /**
     * The item being offered in the flash sale
     * @type {string}
     */
    this.item = languageString(data.TypeName, locale);

    /**
     * The date and time at which the sale will end
     * @type {Date}
     */
    this.expiry = parseDate(data.EndDate);

    /**
     * The date and time at which the sale will or did start
     * @type {Date}
     */
    this.activation = parseDate(data.StartDate);

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
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Get whether or not this deal has expired
   * @returns {boolean}
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
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

    return `${mdConfig.codeBlock}${lines.join(mdConfig.lineEnd)}${mdConfig.blockEnd}`;
  }
}
