import { languageString } from '../utilities/translation.js';

/**
 * A void trader inventory item
 * @property {string} item The name of the inventory item
 * @property {number|string} ducats Ducat cost of the item
 * @property {number|string} credits Credit cost of the item
 */
export default class VoidTraderItem {
  /**
   * @param   {Object}             data            The void trader item data
   * @param   {string}             data.ItemType   Worldstate Item i18n path
   * @param   {string}             data.PrimePrice Ducat cost of the item
   * @param   {string}             data.RegularPrice Credit price of the item
   * @param   {Dependency}         deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor({ ItemType, PrimePrice, RegularPrice }, { locale = 'en' } = { locale: 'en' }) {
    this.uniqueName = ItemType;
    this.item = languageString(ItemType, locale);
    this.ducats = Number.parseInt(PrimePrice, 10);
    this.credits = Number.parseInt(RegularPrice, 10);
  }
}
