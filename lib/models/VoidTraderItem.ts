import { languageString } from 'warframe-worldstate-data/utilities';
import Dependency from '../supporting/Dependency';

export interface RawVoidTraderItem {
  ItemType: string;
  PrimePrice?: number;
  RegularPrice?: number;
}

/**
 * A void trader inventory item
 */
export default class VoidTraderItem {
  uniqueName: string;
  /**
   *  The name of the inventory item
   */
  item: string;
  /**
   * Ducat cost of the item
   */
  ducats: number;
  /**
   * Credit cost of the item
   */
  credits: number;

  /**
   * @param   {object}             data            The void trader item data
   * @param   {string}             data.ItemType   Worldstate Item i18n path
   * @param   {string}             data.PrimePrice Ducat cost of the item
   * @param   {string}             data.RegularPrice Credit price of the item
   * @param   {Dependency}         deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
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
