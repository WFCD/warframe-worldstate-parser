import rewardTypes from '../supporting/RewardTypes.js';
import { languageString } from '../utilities/translation.js';
import { insist } from '../utilities/integrity.js';

/**
 * An object describing a type of reward, including name, description,
 * test function to verify type from a string, thumbnail url, and color
 * @typedef {Object} RewardType
 * @property {string} name          - Name of the reward type
 * @property {string} description   - Description of the reward type
 * @property {string} test          - Function for testing the return type against a string
 * @property {string} thumbnail     - Thumbnail url for this reward type
 * @property {string} color         - Summary color representing this reward type
 */

/**
 * Returns the type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<RewardType>}  [types] The possible types
 * @returns {string}          The type name
 */
export function getItemType(item, types = rewardTypes) {
  return types.find((t) => t.test(item)).name;
}

/**
 * Returns the full type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<RewardType>}  [types] The possible types
 * @returns {RewardType}      The type
 */
export function getItemTypeFull(item, types = rewardTypes) {
  return types.find((t) => t.test(item));
}

/**
 * Represents a mission reward
 */
export default class Reward {
  /**
   * @param   {Object} data        The mission data
   * @param   {Dependency}         deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    insist(data);
    /**
     * The items being rewarded
     * @type {Array.<string>}
     */
    this.items = data.items ? data.items.map((i) => languageString(i), locale) : [];

    /**
     * The counted items being rewarded
     * @type {Array.<Object>}
     */
    this.countedItems = data.countedItems
      ? data.countedItems.map((i) => ({
          count: i.ItemCount,
          type: languageString(i.ItemType, locale),
          key: languageString(i.ItemType),
        }))
      : [];

    /**
     * The credits being rewarded
     * @type {number}
     */
    this.credits = data.credits || 0;

    this.asString = this.toString();

    this.itemString = this.items
      .concat(this.countedItems.map((i) => `${i.count > 1 ? i.count : ''} ${i.type}`.trim()))
      .join(' + ');

    this.thumbnail = this.getTypesFull()[0] ? this.getTypesFull()[0].thumbnail : 'https://i.imgur.com/JCKyUXJ.png';

    this.color = this.getTypesFull()[0] ? this.getTypesFull()[0].color : 0xf1c40f;
  }

  /**
   * The types of all items that are being rewarded
   * @returns {Array.<string>}
   */
  getTypes() {
    return this.items.concat(this.countedItems.map((i) => i.key)).map((t) => getItemType(t));
  }

  /**
   * The types of all the items that are being rewarded
   * @returns {Array.<RewardType>}
   */
  getTypesFull() {
    return this.items.concat(this.countedItems.map((i) => i.key)).map((t) => getItemTypeFull(t));
  }

  /**
   * The reward's string representation
   * @returns {string}
   */
  toString() {
    const tokens = this.items.concat(this.countedItems.map((i) => `${i.count > 1 ? i.count : ''} ${i.type}`.trim()));

    if (this.credits) {
      tokens.push(`${this.credits}cr`);
    }

    return tokens.join(' + ');
  }
}
