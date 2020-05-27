export = PersistentEnemy;
declare const PersistentEnemy_base: typeof import("./WorldstateObject.js");
/**
 * Represents a persistent enemy
 * @extends {WorldstateObject}
 */
declare class PersistentEnemy extends PersistentEnemy_base {
    /**
     * @param   {Object}             data            The persistent enemy data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, locale, }: {
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
     * The enemy's type
     * @type {string}
     */
    agentType: string;
    /**
     * The location tag
     * @type {string}
     */
    locationTag: string;
    /**
     * The enemy's rank
     * @type {number}
     */
    rank: number;
    /**
     * The enemy's remainaing health percentage
     * @type {number}
     */
    healthPercent: number;
    /**
     * The percentual damage that the enemy takes when it's defeated
     * @type {number}
     */
    fleeDamage: number;
    /**
     * The region where the enemy is located
     * @type {string}
     */
    region: string;
    /**
     * The last time the enemy was discovered
     * @type {Date}
     */
    lastDiscoveredTime: Date;
    /**
     * The node at which the enemy was last discovered
     * @type {string}
     */
    lastDiscoveredAt: string;
    /**
     * Whether or not the enemy is currently available
     * @type {Boolean}
     */
    isDiscovered: boolean;
    /**
     * Whether or not the enemy is using ticketing
     * @type {Boolean}
     */
    isUsingTicketing: boolean;
    /**
     * Fake ID incorporating discovery
     * @type {string}
     */
    pid: string;
}
