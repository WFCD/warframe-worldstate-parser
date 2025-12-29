import {
  type ContentTimestamp,
  fromNow,
  languageString,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting/Dependency';

import { WorldStateObject } from './WorldStateObject';

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
export class DailyDeal extends WorldStateObject {
  /**
   * The item that is being offered in the sale
   */
  item: string;

  /**
   * The uniqueName for the item on sale
   */
  uniqueName: string;

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
   * Percent discount
   */
  discount: number;

  /**
   * @param data        The deal data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(
    data: RawDailyDeal,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super(data);

    this.item = languageString(data.StoreItem, locale);

    this.uniqueName = data.StoreItem;

    this.originalPrice = data.OriginalPrice;

    this.salePrice = data.SalePrice;

    this.total = data.AmountTotal;

    this.sold = data.AmountSold;

    this.id = `${data.StoreItem.split('/').slice(-1)[0]}${this.expiry!.getTime()}`;

    this.discount = data.Discount;
  }

  /**
   * Get a string indicating how much time is left before the deal expires
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
