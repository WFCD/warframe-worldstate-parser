import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber, IsString, Min } from 'class-validator';
import {
  type ContentTimestamp,
  fromNow,
  languageString,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

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
export class FlashSale extends WorldStateObject {
  /**
   * The item being offered in the flash sale
   */
  @ApiProperty({ description: 'The item being offered in the flash sale' })
  @IsString()
  item: string;

  /**
   * The item's discount percentage
   */
  @ApiProperty({ description: "The item's discount percentage" })
  @IsNumber()
  @Min(0)
  discount: number;

  /**
   * The item's discounted credit price
   */
  @ApiProperty({ description: "The item's discounted credit price" })
  @IsInt()
  @Min(0)
  regularOverride: number;

  /**
   * The item's discounted platinum price
   */
  @ApiProperty({ description: "The item's discounted platinum price" })
  @IsInt()
  @Min(0)
  premiumOverride: number;

  /**
   * Whether this item is show in the in-game market
   */
  @ApiProperty({
    description: 'Whether this item is shown in the in-game market',
  })
  @IsBoolean()
  isShownInMarket: boolean;

  /**
   * Whether this item is featured in the in-game market
   */
  @ApiProperty({
    description: 'Whether this item is featured in the in-game market',
  })
  @IsBoolean()
  isFeatured: boolean;

  /**
   * Whether this item is marked as popular in the in-game market
   */
  @ApiProperty({
    description: 'Whether this item is marked as popular in the in-game market',
  })
  @IsBoolean()
  isPopular: boolean;

  /**
   * Unique identifier for this sale built from the end time and reward
   */
  @ApiProperty({
    description:
      'Unique identifier for this sale built from the end time and reward',
  })
  @IsString()
  id: string;

  /**
   * @param   {object}             data            The flash sale data
   * @param   {Dependency}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(
    data: RawFlashSale,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super({ Activation: data.StartDate, Expiry: data.EndDate });

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
