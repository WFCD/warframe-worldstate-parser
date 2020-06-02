export = WorldState;
/**
 * Parses Warframe Worldstate JSON
 */
declare class WorldState {
    /**
     * Generates the worldstate json as a string into usable objects
     * @param {string} json The worldstate JSON string
     * @param {Dependency} [deps] The options object
     */
    constructor(json: string, deps?: import("./supporting/Dependency.js"));
    /**
     * The date and time at which the World State was generated
     * @type {Date}
     */
    timestamp: Date;
    /**
     * The in-game news
     * @type {Array.<News>}
     */
    news: Array<import("./News.js")>;
    /**
     * The current events
     * @type {Array.<Event>}
     */
    events: Array<import("./WorldEvent.js")>;
    /**
     * The current alerts
     * @type {Array.<Alert>}
     */
    alerts: Array<import("./Alert.js")>;
    /**
     * The current syndicate missions
     * @type {Array.<SyndicateMission>}
     */
    syndicateMissions: Array<import("./SyndicateMission.js")>;
    /**
     * The current fissures
     * @type {Array.<News>}
     */
    fissures: Array<import("./News.js")>;
    /**
     * The current global upgrades
     * @type {Array.<GlobalUpgrade>}
     */
    globalUpgrades: Array<import("./GlobalUpgrade.js")>;
    /**
     * The current flash sales
     * @type {Array.<FlashSale>}
     */
    flashSales: Array<import("./FlashSale.js")>;
    /**
     * The current invasions
     * @type {Array.<Invasion>}
     */
    invasions: Array<import("./Invasion.js")>;
    /**
     * The state of the dark sectors
     * @type {Array.<DarkSector>}
     */
    darkSectors: Array<import("./DarkSector.js")>;
    /**
     * The current daily deals
     * @type {Array.<DailyDeal>}
     */
    dailyDeals: Array<import("./DailyDeal.js")>;
    /**
     * The state of the sanctuary synthesis targets
     * @type {Simaris}
     */
    simaris: import("./Simaris.js");
    /**
     * The current conclave challenges
     * @type {Array.<ConclaveChallenge>}
     */
    conclaveChallenges: Array<import("./ConclaveChallenge.js")>;
    /**
     * The currently active persistent enemies
     * @type {Array.<PersistentEnemy>}
     */
    persistentEnemies: Array<import("./PersistentEnemy.js")>;
    /**
     * The current earth cycle
     * @type {EarthCycle}
     */
    earthCycle: import("./EarthCycle.js");
    /**
     * The current Cetus cycle
     * @type {CetusCycle}
     */
    cetusCycle: import("./CetusCycle.js");
    /**
     * Weekly challenges
     * @type {Array.<WeeklyChallenge>}
     */
    weeklyChallenges: Array<import("./WeeklyChallenge.js")>;
    /**
     * The Current construction progress for Fomorians/Razorback/etc.
     * @type {ConstructionProgress}
     */
    constructionProgress: import("./ConstructionProgress.js");
    /**
     * The current Orb Vallis cycle state
     * @type {VallisCycle}
     */
    vallisCycle: import("./VallisCycle.js");
    /**
     * The current nightwave season
     * @type {Nightwave}
     */
    nightwave: import("./Nightwave.js");
    /**
     * Current syndicate outposts
     * @type {SyndicateOutpost}
     */
    sentientOutposts: import("./SentientOutpost.js");
}
