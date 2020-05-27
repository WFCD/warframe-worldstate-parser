export = VoidTraderItem;
/**
 * A void trader inventory item
 * @property {string} item The name of the inventory item
 * @property {number|string} ducats Ducat cost of the item
 * @property {number|string} credits Credit cost of the item
 */
declare class VoidTraderItem {
    /**
     * @param   {Object}             data            The challenge instance data
     * @param   {string}             data.ItemType   Worldstate Item i18n path
     * @param   {string}             data.PrimePrice Ducat cost of the item
     * @param   {string}             data.RegularPrice Credit price of the item
     * @param   {Dependency}         deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor({ ItemType, PrimePrice, RegularPrice }: {
        ItemType: string;
        PrimePrice: string;
        RegularPrice: string;
    }, { translator, locale }: any);
    item: any;
    ducats: number;
    credits: number;
}
