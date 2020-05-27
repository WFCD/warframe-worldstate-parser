export = Simaris;
/**
 * Contains information about sanctuary targets
 */
declare class Simaris {
    /**
     * @param   {Object}             data            The sanctuary data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, locale }: {
        mdConfig: any;
        translator: any;
        locale: string;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The sanctuary target
     * @type {string}
     */
    target: string;
    /**
     * Whether or not the target is currently active
     * @type {Boolean}
     */
    isTargetActive: boolean;
    /**
     * A string representation of the current sanctuary status
     * @type {string}
     */
    asString: string;
    /**
     * Returns a string representation of the current sanctuary status
     * @returns {string}
     */
    toString(): string;
}
