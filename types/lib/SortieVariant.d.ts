export = SortieVariant;
/**
 * Represents a sortie variant
 */
declare class SortieVariant {
    /**
     * @param   {Object}            data               Sortie variant data
     * @param   {Object}            deps               The dependencies object
     * @param   {MarkdownSettings}  deps.mdConfig      The markdown settings
     * @param   {Translator}        deps.translator    The string translator
     * @param   {Object}            deps.sortieData    The data used to parse sorties
     * @param   {string}            deps.locale        Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, sortieData, locale, }: {
        mdConfig: any;
        translator: any;
        sortieData: any;
        locale: string;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The variant's boss
     * @type {string}
     */
    boss: string;
    /**
     * The planet where the variant takes place
     * @type {string}
     */
    planet: string;
    /**
     * The variant's mission type
     * @type {string}
     */
    missionType: string;
    /**
     * The variant's modifier
     * @type {string}
     */
    modifier: string;
    /**
     * The variant's modifier description
     * @type {string}
     */
    modifierDescription: string;
    /**
     * The node where the variant takes place
     * @type {string}
     */
    node: string;
    /**
     * Returns a string representation of the sortie variant
     * @returns {string}
     */
    toString(): string;
}
