export = Mission;
/**
 * Represents an in-game mission
 */
declare class Mission {
    /**
     * @param   {Object}             data            The mission data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {Reward}             deps.Reward     The Reward parser
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, Reward, locale, }: {
        mdConfig: any;
        translator: any;
        Reward: any;
        locale: string;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    /**
     * The mission's description
     * @type {?string}
     */
    description: string | null;
    /**
     * The node where the mission takes place
     * @type {string}
     */
    node: string;
    /**
     * The mission's type
     * @type {string}
     */
    type: string;
    /**
     * The factions that the players must fight in the mission
     * @type {string}
     */
    faction: string;
    /**
     * The mission's reward
     * @type {?Reward}
     */
    reward: any;
    /**
     * The minimum level of the enemies in the mission
     * @type {number}
     */
    minEnemyLevel: number;
    /**
     * The maximum level of the enemies in the mission
     * @type {number}
     */
    maxEnemyLevel: number;
    /**
     * The number of waves that the players need to complete (undefined if not applicable)
     * @type {?number}
     */
    maxWaveNum: number | null;
    /**
     * The Mission's nightmare boolean
     * @type {boolean}
     */
    nightmare: boolean;
    /**
     * The Mission's archwing requirement
     * @type {boolean}
     */
    archwingRequired: boolean;
    /**
     * The Mission's sharkwing requirement
     * @type {boolean}
     */
    isSharkwing: boolean;
    /**
     * Override for the map on this mission
     * @type {string}
     */
    levelOverride: string;
    /**
     * Enemy specification for the mission
     * @type {String}
     */
    enemySpec: string;
    /**
     * Array of strings denoting extra spawners for a mission
     * @type {string[]}
     */
    advancedSpawners: string[];
    /**
     * Items required to enter the mission
     * @type {string[]}
     */
    requiredItems: string[];
    /**
     * Whether or not the required items are consumed
     * @type {boolean}
     */
    consumeRequiredItems: boolean;
    /**
     * Target for the mission
     * @type {string}
     */
    target: string;
    /**
     * Whether or not leaders are always allowed
     * @type {boolean}
     */
    leadersAlwaysAllowed: boolean;
    /**
     * A tag for the event that this corresponds to
     * @type {string}
     */
    goalTag: string;
    /**
     * Affectors for this mission
     * @type {string[]}
     */
    levelAuras: string[];
    /**
     * Only weapon allowed for the mission
     * @type {string}
     */
    exclusiveWeapon: string;
    /**
     * The Mission's string representation
     * @returns {string}
     */
    toString(): string;
}
