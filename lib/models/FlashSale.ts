import { parseDate, fromNow, timeDeltaToString, languageString } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';
import Dependency from '../supporting/Dependency.js';
import { ContentTimestamp } from './WorldstateObject.js';

export interface RawFlashSale {
  TypeName: string;
  EndDate: ContentTimestamp;
  StartDate: ContentTimestamp;
  Discount: number;
  RegularOverride: number;
  PremiumOverride: number;
  ShowInMarket: boolean;
  Featured: boolean;
  Popular: boolean;
}

/**
 * Represents a flash sale
 */
export default class FlashSale {
  /**
   * The item being offered in the flash sale
   */
  item: string;

  /**
   * The date and time at which the sale will end
   */
  expiry: Date;

  /**
   * The date and time at which the sale will or did start
   */
  activation: Date;

  /**
   * The item's discount percentage
   */
  discount: number;

  /**
   * The item's discounted credit price
   */
  regularOverride: number;

  /**
   * The item's discounted platinum price
   */
  premiumOverride: number;

  /**
   * Whether this item is show in the in-game market
   */
  isShownInMarket: boolean;

  /**
   * Whether this item is featured in the in-game market
   */
  isFeatured: boolean;

  /**
   * Whether this item is marked as popular in the in-game market
   */
  isPopular: boolean;

  /**
   * Unique identifier for this sale built from the end time and reward
   */
  id: string;

  /**
   * Whether or not this is expired (at time of object creation)
   */
  expired: boolean;

  /**
   * ETA string (at time of object creation)
   */
  eta: string;

  /**
   * @param   {object}             data            The flash sale data
   * @param   {Dependency}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawFlashSale, { locale = 'en' }: Dependency = { locale: 'en' }) {
    this.item = languageString(data.TypeName, locale);

    this.expiry = parseDate(data.EndDate);

    this.activation = parseDate(data.StartDate);

    this.discount = data.Discount;

    this.regularOverride = data.RegularOverride;

    this.premiumOverride = data.PremiumOverride;

    this.isShownInMarket = data.ShowInMarket;

    this.isFeatured = data.Featured;

    this.isPopular = data.Popular;

    this.id = `${data.TypeName.split('/').slice(-1)[0]}${this.expiry.getTime()}`;

    this.expired = this.getExpired();

    this.eta = this.getETAString();
  }

  /**
   * Get how much time is left before the deal expires
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Get whether or not this deal has expired
   */
  getExpired(): boolean {
    return fromNow(this.expiry) < 0;
  }

  /**
   * Returns a string representation of the flash sale
   */
  toString(): string {
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
