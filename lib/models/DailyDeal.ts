import {
  parseDate,
  timeDeltaToString,
  fromNow,
  languageString,
} from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';
import Dependency from '../supporting/Dependency.js';
import { ContentTimestamp } from './WorldstateObject.js';

export interface RawDailyDeal {
  StoreItem: string;
  Expiry: ContentTimestamp;
  Activation: ContentTimestamp;
  OriginalPrice: number;
  SalePrice: number;
  AmountTotal: number;
  AmountSold: number;
  Discount: number;
}

/**
 * Represents a daily deal
 */
export default class DailyDeal {
  /**
   * The item that is being offered in the sale
   */
  item: string;
  
  /**
   * The uniqueName for the item on sale
   */
  uniqueName: string;
  
  /**
   * The date and time at which the deal will expire
   */
  expiry: Date;
  
  /**
   * The date and time at which the deal will or did start
   */
  activation: Date;
  
  /**
   * The item's original price
   */
  originalPrice: number;
  
  /**
   * The item's discounted price
   */
  salePrice: number;
  
  /**
   * The number of available items on sale
   */
  total: number;
  
  /**
   * The number of items that have already been sold
   */
  sold: number;
  
  /**
   * Unique identifier for this deal built from the end time and item
   */
  id: string;
  
  /**
   * ETA string (at time of object creation)
   */
  eta: string;
  
  /**
   * Percent discount
   */
  discount: number;

  /**
   * @param   {object}            data            The deal data
   * @param   {object}            deps            The dependencies object
   * @param   {string}            deps.locale     Locale to use for translations
   */
  constructor(data: RawDailyDeal, { locale = 'en' }: Dependency = { locale: 'en' }) {
    this.item = languageString(data.StoreItem, locale);

    this.uniqueName = data.StoreItem;

    this.expiry = parseDate(data.Expiry);

    this.activation = parseDate(data.Activation);

    this.originalPrice = data.OriginalPrice;

    this.salePrice = data.SalePrice;

    this.total = data.AmountTotal;

    this.sold = data.AmountSold;

    this.id = `${data.StoreItem.split('/').slice(-1)[0]}${this.expiry.getTime()}`;

    this.eta = this.getETAString();

    this.discount = data.Discount;
  }

  /**
   * Get a string indicating how much time is left before the deal expires
   */
  getETAString(): string {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the daily deal
   */
  toString(): string {
    const lines = [
      `Daily Deal: ${this.item}`,
      `${this.salePrice}p (original ${this.originalPrice}p)`,
      `${this.sold} / ${this.total} sold`,
      `Expires in ${this.getETAString()}`,
    ];
    return lines.join(mdConfig.lineEnd);
  }
}
