export = VoidTrader;
declare const VoidTrader_base: typeof import("./WorldstateObject.js");
/**
 * Represents a void trader
 * @extends {WorldstateObject}
 */
declare class VoidTrader extends VoidTrader_base {
    /**
     * @param   {Object}             data            The Void trader data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, locale, }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
        locale: string;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The void trader's name
     * @type {string}
     */
    character: string;
    /**
     * The node at which the Void Trader appears
     * @type {string}
     */
    location: string;
    /**
     * The trader's inventory
     * @type {VoidTraderItem[]}
     */
    inventory: import("./VoidTraderItem.js")[];
    /**
     * Pseudo Identifier for identifying changes in inventory
     * @type {string}
     */
    psId: string;
    /**
     * A string indicating how long it will take for the trader to leave
     *  (at time of object creation)
     * @type {string}
     */
    endString: string;
}
