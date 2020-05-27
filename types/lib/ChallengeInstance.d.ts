export = ChallengeInstance;
/**
 * Describes a world challenge instance
 */
declare class ChallengeInstance {
    /**
     * @param   {Object}             data            The challenge instance data
     * @param   {Dependency}         deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { translator, locale }: any);
    /**
     * Type of challenge
     * @type {string}
     */
    type: string;
    /**
     * Minimum enemy level to fulfill challenge
     * @type {Number}
     */
    minEnemyLevel: number;
    /**
     * Required number of units to complete challenge
     * @type {Number}
     */
    requiredAmount: number;
    /**
     * Waypoint for amount of units between progression updates
     * @type {Number}
     */
    progressAmount: number;
    /**
     * Required damage type
     * @type {String|undefined}
     */
    damageType: string | undefined;
    /**
     * Target to fulfill challenge
     * @type {string}
     */
    target: string;
    toString(): string;
}
