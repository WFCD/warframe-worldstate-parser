import { insist, languageString } from 'warframe-worldstate-data/utilities';
import type Dependency from '../supporting/Dependency';
import rewardTypes, { type RewardType } from '../supporting/RewardTypes';

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
 * Represents a mission reward
 */
export default class Reward {
  /**
   * The items being rewarded
   */
  items: string[];

  /**
   * The counted items being rewarded
   */
  countedItems: { type: string; key: string; count: number }[];

  /**
   * The credits being rewarded
   */
  credits: number;

  itemString: string;
  thumbnail: string;
  color: number;

  /**
   * @param data        The mission data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawReward, { locale = 'en' }: Dependency = { locale: 'en' }) {
    insist({ ...data });

    this.items = data.items ? data.items.map((i) => languageString(i, locale)) : [];

    this.countedItems = data.countedItems
      ? data.countedItems.map((i) => ({
          count: i.ItemCount,
          type: languageString(i.ItemType, locale),
          key: languageString(i.ItemType),
        }))
      : [];

    this.credits = data.credits || 0;

    this.itemString = this.items
      .concat(this.countedItems.map((i) => `${i.count > 1 ? i.count : ''} ${i.type}`.trim()))
      .join(' + ');

    this.thumbnail = this.getTypesFull()[0] ? this.getTypesFull()[0].thumbnail : 'https://i.imgur.com/JCKyUXJ.png';

    this.color = this.getTypesFull()[0] ? this.getTypesFull()[0].color : 0xf1c40f;
  }

  /**
   * The reward's string representation
   */
  get asString(): string {
    const tokens = this.items.concat(this.countedItems.map((i) => `${i.count > 1 ? i.count : ''} ${i.type}`.trim()));

    if (this.credits) {
      tokens.push(`${this.credits}cr`);
    }

    return tokens.join(' + ');
  }

   /**
   * The types of all items that are being rewarded
   */
  getTypes(): string[] {
    return this.items.concat(this.countedItems.map((i) => i.key)).map((t) => getItemType(t));
  }

  /**
   * The types of all the items that are being rewarded
   */
  private getTypesFull(): Array<RewardType> {
    return this.items.concat(this.countedItems.map((i) => i.key)).map((t) => getItemTypeFull(t));
  }
}
