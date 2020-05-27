export = WorldEvent;
declare const WorldEvent_base: typeof import("./WorldstateObject.js");
/**
 * Interim step for an event reward system.
 * @typedef {Object} InterimStep
 *
 * @property {Number} goal          Goal amount
 * @property {Reward} reward        Reward for reaching the step
 * @property {Number} winnerCount   Amount of players at this step
 * @property {Object} message       Message received when reaching the interim step
 */
/**
 * Progress for one of multiple stages
 * @typedef {Object} ProgessStep
 *
 * @property {string} type
 * @property {Number} progressAmt
 */
/**
 * Represents an in-game special event
 *
 * @extends {WorldstateObject}
 */
declare class WorldEvent extends WorldEvent_base {
    /**
     * @param   {Object}            data            The event data
     * @param   {Object}            deps            The dependencies object
     * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
     * @param   {Translator}        deps.translator The string translator
     * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
     * @param   {Reward}            deps.Reward     The Reward parser
     * @param   {string}            deps.locale     Locale to use for translations
     */
    constructor(data: any, { mdConfig, translator, timeDate, Reward, locale, }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
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
     * The event's main score goal
     * @type {number}
     */
    maximumScore: number;
    /**
     * The current score on the event
     * @type {number}
     */
    currentScore: number;
    /**
     * The first intermediate score goal
     * @type {?number}
     */
    smallInterval: number | null;
    /**
     * The second intermediate score goal
     * @type {?number}
     */
    largeInterval: number | null;
    /**
     * The faction that the players must fight in the event
     * @type {string}
     */
    faction: string;
    /**
     * The description of the event
     * @type {string}
     */
    description: string;
    /**
     * Tooltip for the event
     * @type {?string}
     */
    tooltip: string | null;
    /**
     * The node where the event takes place
     * @type {?string}
     */
    node: string | null;
    /**
     * The other nodes where the event takes place
     * @type {string[]}
     */
    concurrentNodes: string[];
    /**
     * The victim node
     * @type {?string}
     */
    victimNode: string | null;
    /**
     * The score description
     * @type {?string}
     */
    scoreLocTag: string | null;
    /**
     * The event's rewards
     * @type {Reward[]}
     */
    rewards: any[];
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * Health remaining for the target
     * @type {Number}
     */
    health: number;
    affiliatedWith: any;
    jobs: any;
    previousJobs: any;
    /**
     * Previous job id
     * @type {String}
     */
    previousId: string;
    /**
     * Array of steps
     * @type {InterimStep[]}
     */
    interimSteps: InterimStep[];
    /**
     * Progress Steps, if any are present
     * @type {ProgessStep[]}
     */
    progressSteps: ProgessStep[];
    /**
     * Total of all MultiProgress
     * @type {Number}
     */
    progressTotal: number;
    /**
     * Whether or not to show the total score at the end of the mission
     * @type {boolean}
     */
    showTotalAtEndOfMission: boolean;
    /**
     * Whether or not the event is personal
     * @type {Boolean}
     */
    isPersonal: boolean;
    /**
     * Whether or not the event is community
     * @type {Boolean}
     */
    isCommunity: boolean;
    /**
     * Affectors for this mission
     * @type {string[]}
     */
    regionDrops: string[];
    /**
     * Archwing Drops in effect while this event is active
     * @type {string[]}
     */
    archwingDrops: string[];
    asString: string;
    /**
     * Metadata provided by DE
     * @type {Object}
     */
    metadata: any;
    /**
     * Bonuses given for completion
     * @type {Array.<Number>}
     */
    completionBonuses: Array<number>;
    scoreVar: any;
    altExpiry: any;
    altActivation: any;
    nextAlt: {
        expiry: any;
        activation: any;
    };
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
}
declare namespace WorldEvent {
    export { InterimStep, ProgessStep };
}
/**
 * Interim step for an event reward system.
 */
type InterimStep = {
    /**
     * Goal amount
     */
    goal: number;
    /**
     * Reward for reaching the step
     */
    reward: any;
    /**
     * Amount of players at this step
     */
    winnerCount: number;
    /**
     * Message received when reaching the interim step
     */
    message: any;
};
/**
 * Progress for one of multiple stages
 */
type ProgessStep = {
    type: string;
    progressAmt: number;
};
