import { IsArray, IsInt, IsNumber, IsString, Min } from 'class-validator';
import { insist, languageString } from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';
import rewardTypes, { type RewardType } from '@/supporting/RewardTypes';

/**
 * Returns the type of a given item
 */
export function getItemType(item: string, types = rewardTypes): string {
  // Return will never be null because of the catch all value in rewardTypes array
  return types.find((t) => t.test(item))!.name;
}

/**
 * Returns the full type of a given item
 */
export function getItemTypeFull(item: string, types = rewardTypes): RewardType {
  // See comment in getItemType
  return types.find((t) => t.test(item))!;
}

export interface RawReward {
  items: string[];
  countedItems?: { ItemType: string; ItemCount: number }[];
  credits?: number;
}

/**
 * A counted reward item, including uncounted `items` folded in at count 1
 */
export interface CountedItem {
  /**
   * Raw item uniqueName path
   */
  uniqueName: string;
  /**
   * Localized item name
   */
  type: string;
  /**
   * English item name
   */
  key: string;
  /**
   * Quantity rewarded
   */
  count: number;
}

/**
 * Represents a mission reward
 */
export class Reward {
  /**
   * The items being rewarded
   * @deprecated Use {@link Reward.countedItems} instead
   */
  @IsArray()
  @IsString({ each: true })
  items: string[];

  /**
   * All rewarded items, including former uncounted `items` at count 1
   */
  @IsArray()
  countedItems: CountedItem[];

  /**
   * The credits being rewarded
   */
  @IsInt()
  @Min(0)
  credits: number;

  /**
   * Thumbnail url
   */
  @IsString()
  thumbnail: string;

  /**
   * Reward color
   */
  @IsNumber()
  color: number;

  /**
   * @param data        The mission data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(
    data: RawReward,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    insist({ ...data });

    this.items = data.items
      ? data.items.map((i) => languageString(i, locale))
      : [];

    const fromItems = (data.items ?? []).map((i) => ({
      uniqueName: i,
      type: languageString(i, locale),
      key: languageString(i),
      count: 1,
    }));

    const fromCounted = (data.countedItems ?? []).map((i) => ({
      uniqueName: i.ItemType,
      type: languageString(i.ItemType, locale),
      key: languageString(i.ItemType),
      count: i.ItemCount,
    }));

    this.countedItems = [...fromItems, ...fromCounted];

    this.credits = data.credits || 0;

    this.thumbnail = this.getTypesFull()[0]
      ? this.getTypesFull()[0].thumbnail
      : 'https://i.imgur.com/JCKyUXJ.png';

    this.color = this.getTypesFull()[0]
      ? this.getTypesFull()[0].color
      : 0xf1c40f;
  }

  /**
   * The types of all items that are being rewarded
   */
  getTypes(): string[] {
    return this.countedItems.map((i) => getItemType(i.key));
  }

  /**
   * The types of all the items that are being rewarded
   */
  private getTypesFull(): Array<RewardType> {
    return this.countedItems.map((i) => getItemTypeFull(i.key));
  }
}
