import {
  type ContentTimestamp,
  fromNow,
  languageString,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import type Dependency from '../supporting/Dependency';
import type { BaseContentObject } from './WorldstateObject';
import WorldstateObject from './WorldstateObject';

export interface RawFlashSale extends BaseContentObject {
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
export default class FlashSale extends WorldstateObject{
  /**
   * The item being offered in the flash sale
   */
  item: string;

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
   * @param   {object}             data            The flash sale data
   * @param   {Dependency}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data: RawFlashSale, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super({Activation: data.StartDate, Expiry: data.EndDate})

    this.item = languageString(data.TypeName, locale);

    this.discount = data.Discount;

    this.regularOverride = data.RegularOverride;

    this.premiumOverride = data.PremiumOverride;

    this.isShownInMarket = data.ShowInMarket;

    this.isFeatured = data.Featured;

    this.isPopular = data.Popular;

    this.id = `${data.TypeName.split('/').slice(-1)[0]}${this.expiry!.getTime()}`;
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta() {
    return timeDeltaToString(fromNow(this.expiry!));
  }

  /**
   * Whether or not this is expired (at time of object creation)
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }
}
