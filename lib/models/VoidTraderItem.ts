import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';
import { languageString } from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

export interface RawVoidTraderItem {
  ItemType: string;
  PrimePrice?: number;
  RegularPrice?: number;
}

/**
 * A void trader inventory item
 */
export class VoidTraderItem {
  @ApiProperty({ description: 'Unique item identifier' })
  @IsString()
  uniqueName: string;
  /**
   *  The name of the inventory item
   */
  @ApiProperty({ description: 'Localized item name' })
  @IsString()
  item: string;
  /**
   * Ducat cost of the item
   */
  @ApiProperty({ description: 'Ducat cost' })
  @IsInt()
  @Min(0)
  ducats: number;
  /**
   * Credit cost of the item
   */
  @ApiProperty({ description: 'Credit cost' })
  @IsInt()
  @Min(0)
  credits: number;

  /**
   * @param data              The void trader item data
   * @param data.ItemType     Worldstate Item i18n path
   * @param data.PrimePrice   Ducat cost of the item
   * @param data.RegularPrice Credit price of the item
   * @param deps              The dependencies object
   * @param deps.locale       Locale to use for translations
   */
  constructor(
    { ItemType, PrimePrice, RegularPrice }: RawVoidTraderItem,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    this.uniqueName = ItemType;
    this.item = languageString(ItemType, locale);
    this.ducats = Number.parseInt(String(PrimePrice), 10);
    this.credits = Number.parseInt(String(RegularPrice), 10);
  }
}
