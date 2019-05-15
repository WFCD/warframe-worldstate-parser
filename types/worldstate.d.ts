// Type definitions for warframe-worldstate-parser 2.6.0
// Project: https://github.com/wfcd/warframe-worldstate-parser
// Definitions by: Matej Voboril <https://github.com/tobitenno>
// Definitions: https://github.com/wfcd/warframe-worldstate-parser

/**
 * @param   {Object}             data            The alert data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {Mission}            deps.Mission    The Mission parser
 * @param   {Reward}             deps.Reward     The Reward parser
 */
declare class Alert extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        Mission: Mission;
        Reward: Reward;
    });
    /**
     * The mission that the players have to complete
     * @type {Mission}
     */
    mission: Mission;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    rewardTypes: string[];
    /**
     * A tag that DE occasionally provides, such as `LotusGift`
     * @type {String}
     */
    tag: string;
    /**
     * Get the alert's description text
     * @returns {string}
     */
    getDescription(): string;
    /**
     * Get the alert's reward
     * @returns {Reward}
     */
    getReward(): Reward;
    /**
     * Get a string indicating how much time is left before the alert expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get an array containing the types of all of the alert's rewards
     * @returns {Array.<string>}
     */
    getRewardTypes(): string[];
    /**
     * The alert's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Date}              bountiesEndDate The end date for Ostron bounties
 * @param   {Object}            deps            The dependencies object
 * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
 * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
 */
declare class CetusCycle extends WorldstateObject {
    constructor(bountiesEndDate: Date, deps: {
        mdConfig: MarkdownSettings;
        timeDate: TimeDateFunctions;
    });
    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    isDay: boolean;
    /**
     * Time remaining string
     * @type {string}
     */
    timeLeft: string;
    /**
     * Whether or not this is for Cetus Cycle
     * @type {boolean}
     */
    isCetus: boolean;
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * The event's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The challenge instance data
 * @param   {Dependency}         deps            The dependencies object
 * @param   {Translator}         deps.translator The string translator
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class ChallengeInstance {
    constructor(data: any, deps: {
        translator: Translator;
        locale: string;
    });
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
}

/**
 * @param   {Object}             data            The challenge data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class ConclaveChallenge extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        locale: string;
    });
    /**
     * The challenge's description text
     * @type {string}
     */
    description: string;
    /**
     * The time and date at which the challenge expires
     * @type {Date}
     */
    expiry: Date;
    /**
     * The number of times that the challenge's objective needs to be completed
     * @type {number}
     */
    amount: number;
    /**
     * The PVP mode that the challenge must be completed in
     * @type {string}
     */
    mode: string;
    /**
     * The challenge's category (daily, weekly...)
     * @type {string}
     */
    category: string;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * Whether or not this is a daily conclave challenge.
     * @type {boolean}
     */
    daily: boolean;
    /**
     * Whether or not this is the root challenge
     * @type {boolean}
     */
    rootChallenge: boolean;
    /**
     * the end string
     * @type {string}
     */
    endString: string;
    /**
     * This challenge as a string
     * @type {string}
     */
    asString: string;
    /**
     * Get whether or not the challenge is daily
     * @returns {boolean}
     */
    isDaily(): boolean;
    /**
     * Get whether or not this is the weekly root challenge
     * @returns {boolean}
     */
    isRootChallenge(): boolean;
    /**
     * Get whether or not the challenge has expired
     * @returns {boolean}
     */
    isExpired(): boolean;
    /**
     * Get a string indicating how much time is left before the challenge expires
     * @returns {string}
     */
    getEndString(): string;
    /**
     * The conclave challenge's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
}

/**
 * @param   {Object}             data            The construction data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 */
declare class ConstructionProgress extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
    });
    /**
     * The alert's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}            data            The deal data
 * @param   {Object}            deps            The dependencies object
 * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
 * @param   {Translator}        deps.translator The string translator
 * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
 * @param   {string}            deps.locale     Locale to use for translations
 */
declare class DailyDeal {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        locale: string;
    });
    /**
     * The item that is being offered in the sale
     * @type {string}
     */
    item: string;
    /**
     * The date and time at which the deal will expire
     * @type {Date}
     */
    expiry: Date;
    /**
     * The item's original price
     * @type {number}
     */
    originalPrice: number;
    /**
     * The item's discounted price
     * @type {number}
     */
    salePrice: number;
    /**
     * The number of available items on sale
     * @type {number}
     */
    total: number;
    /**
     * The number of items that have already been sold
     * @type {number}
     */
    sold: number;
    /**
     * Unique identifier for this deal built from the end time and item
     * @type {string}
     */
    id: string;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Percent discount
     * @type {number}
     */
    discount: number;
    /**
     * Get a string indicating how much time is left before the deal expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Returns a string representation of the daily deal
     * @returns {string}
     */
    toString(): string;
}

/**
 * @param   {Object}             data                  The dark sector data
 * @param   {Object}             deps                  The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig         The markdown settings
 * @param   {Translator}         deps.translator       The string translator
 * @param   {TimeDateFunctions}  deps.timeDate         The time and date functions
 * @param   {Mission}            deps.Mission          The mission parser
 * @param   {DarkSectorBattle}   deps.DarkSectorBattle The dark sector battle parser
 * @param   {Reward}             deps.Reward           The reward parser
 * @param   {string}             deps.locale           Locale to use for translations
 */
declare class DarkSector extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        Mission: Mission;
        DarkSectorBattle: DarkSectorBattle;
        Reward: Reward;
        locale: string;
    });
    /**
     * The dark sector credit tax rate
     * @type {number}
     */
    creditTaxRate: number;
    /**
     * The dark sector credit tax rate for clan/alliance members
     * @type {number}
     */
    memberCreditsTaxRate: number;
    /**
     * The dark sector resource tax rate
     * @type {number}
     */
    itemsTaxRate: number;
    /**
     * The dark sector resource tax rate for clan/alliance members
     * @type {number}
     */
    memberItemsTaxRate: number;
    /**
     * Whether the dark sector holder is an alliance or not
     * @type {Boolean}
     */
    isAlliance: boolean;
    /**
     * The current holder of the dark sector
     * @type {string}
     */
    defenderName: string;
    /**
     * The remaining health of the current solar rail
     * @type {number}
     */
    defenderPoolRemaining: number;
    /**
     * The maximum health of the solar rail
     * @type {number}
     */
    defenderMaxPool: number;
    /**
     * The date and time at which the rail was deployed
     * @type {Date}
     */
    defenderDeployemntActivation: Date;
    /**
     * The solar rail type
     * @type {string}
     */
    railType: string;
    /**
     * The MOTD set by the dark sector holder
     * @type {string}
     */
    defenderMOTD: string;
    /**
     * The player who deployed the solar rail
     * @type {string}
     */
    deployerName: string;
    /**
     * The clan of the player who deployed the solar rail
     * @type {string}
     */
    deployerClan: string;
    /**
     * The dark sector's mission
     * @type {?Mission}
     */
    mission: Mission;
    /**
     * The battle pay per mission offered to players
     * @type {number}
     */
    perMissionBattlePay: number;
    /**
     * The player who set the battle pay
     * @type {string}
     */
    battlePaySetBy: string;
    /**
     * The clan of the player who set the battle pay
     * @type {string}
     */
    battlePaySetByClan: string;
    /**
     * The player who changed the tax
     * @type {string}
     */
    taxChangedBy: string;
    /**
     * The clan of the player who set the tax
     * @type {string}
     */
    taxChangedByClan: string;
    /**
     * The history of the dark sector
     * @type {Array.<DarkSectorBattle>}
     */
    history: DarkSectorBattle[];
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Returns a string representation of the object
     * @returns {string}
     */
    toString(): string;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object} data The battle data
 */
declare class DarkSectorBattle {
    constructor(data: any);
    /**
     * The defenders of the dark sector
     * @type {string}
     */
    defender: string;
    /**
     * Whether the defenders are an alliance or not
     * @type {boolean}
     */
    defenderIsAlliance: boolean;
    /**
     * The attackers of the dark sector
     * @type {string}
     */
    attacker: string;
    /**
     * Whether the attackers are an alliance or not
     * @type {boolean}
     */
    attackerIsAlliance: boolean;
    /**
     * The winner of the battle
     * @type {string}
     */
    winner: string;
    /**
     * The date and time at which the battle started
     * @type {Date}
     */
    start: Date;
    /**
     * The date and time at which the battle ended
     * @type {Date}
     */
    end: Date;
}

/**
 * @param   {Object}            data            The event data
 * @param   {Object}            deps            The dependencies object
 * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
 */
declare class EarthCycle extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
    });
    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    isDay: boolean;
    /**
     * Time remaining string
     * @type {string}
     */
    timeLeft: string;
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * The event's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The fissure data
 * @param   {Object}             deps            The dependencies object
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class Fissure extends WorldstateObject {
    constructor(data: any, deps: {
        translator: Translator;
        timeDate: TimeDateFunctions;
        locale: string;
    });
    /**
     * The node where the fissure has appeared
     * @type {string}
     */
    node: string;
    /**
     * The fissure mission type
     * @type {string}
     */
    missionType: string;
    /**
     * The faction controlling the node where the fissure has appeared
     * @type {string}
     */
    enemy: string;
    /**
     * The fissure's tier
     * @type {string}
     */
    tier: string;
    /**
     * The fissure's tier as a number
     * @type {number}
     */
    tierNum: number;
    /**
     * The date and time at which the fissure appeared
     * @type {Date}
     */
    activation: Date;
    /**
     * The date and time at which the fissure will disappear
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Get whether or not this deal has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * Get a string representation of how long the void fissure will remain active
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Returns a string representation of the fissure
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The flash sale data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class FlashSale {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        locale: string;
    });
    /**
     * The item being offered in the flash sale
     * @type {string}
     */
    item: string;
    /**
     * The date and time at which the sale will end
     * @type {Date}
     */
    expiry: Date;
    /**
     * The item's discount percentage
     * @type {number}
     */
    discount: number;
    /**
     * The item's discounted credit price
     * @type {number}
     */
    regularOverride: number;
    /**
     * The item's discounted platinum price
     * @type {number}
     */
    premiumOverride: number;
    /**
     * Whether this item is show in the in-game market
     * @type {boolean}
     */
    isShownInMarket: boolean;
    /**
     * Whether this item is featured in the in-game market
     * @type {boolean}
     */
    isFeatured: boolean;
    /**
     * Whether this item is marked as popular in the in-game market
     * @type {boolean}
     */
    isPopular: boolean;
    /**
     * Unique identifier for this sale built from the end time and reward
     * @type {string}
     */
    id: string;
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Get how much time is left before the deal expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get whether or not this deal has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * Returns a string representation of the flash sale
     * @returns {string}
     */
    toString(): string;
}

/**
 * @param   {Object}             data            The global upgrade data
 * @param   {Object}             deps            The dependencies object
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class GlobalUpgrade {
    constructor(data: any, deps: {
        translator: Translator;
        timeDate: TimeDateFunctions;
        mdConfig: MarkdownSettings;
        locale: string;
    });
    /**
     * The time and date at which the global upgrade starts being active
     * @type {Date}
     */
    start: Date;
    /**
     * The time and date at which the global upgrade stops being active
     * @type {Date}
     */
    end: Date;
    /**
     * The effect of the upgrade
     * @type {string}
     */
    upgrade: string;
    /**
     * The operation type
     * @type {string}
     */
    operation: string;
    /**
     * Symbol for operation
     * @type {string}
     */
    operationSymbol: string;
    /**
     * The operation value
     * @type {string}
     */
    upgradeOperationValue: string;
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Plaintext description of upgrade
     * @type {string}
     */
    desc: string;
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * Get a string indicating how long it will take for the upgrade to expire
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Turn the global upgrade into a plain text description
     * @returns {string} Descriptio
     */
    compileDesription(): string;
    /**
     * Returns a string representation of the upgrade
     * @returns {string}
     */
    toString(): string;
}

/**
 * @param   {Object}             data            The invasion data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {Reward}             deps.Reward     The Reward parser
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class Invasion {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        Reward: Reward;
        locale: string;
    });
    /**
     * The node where the invasion is taking place
     * @type {string}
     */
    node: string;
    /**
     * The invasion's description
     * @type {string}
     */
    desc: string;
    /**
     * The attacker's reward
     * @type {Reward}
     */
    attackerReward: Reward;
    /**
     * The attacking faction
     * @type {string}
     */
    attackingFaction: string;
    /**
     * The defender's reward
     * @type {Reward}
     */
    defenderReward: Reward;
    /**
     * The defending faction
     * @type {string}
     */
    defendingFaction: string;
    /**
     * Whether this invasion is against the infestation
     * @type {boolean}
     */
    vsInfestation: boolean;
    /**
     * The time at which the invasion starts
     * @type {Date}
     */
    activation: Date;
    /**
     * The signed count of completed runs. Supporting the attackers makes the count go up,
     * supporting the defenders makes it go down
     * @type {number}
     */
    count: number;
    /**
     * The number of runs that one side needs to win
     * @type {number}
     */
    requiredRuns: number;
    /**
     * The invasion's completion percentage. Defenders win if it gets to 0
     * Grineer vs. Corpus invasions start at 50, Infested invasions start at 100
     * @type {number}
     */
    completion: number;
    /**
     * Whether the invasion has finished
     * @type {boolean}
     */
    completed: boolean;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    rewardTypes: string[];
    /**
     * Whether or not the attackers are winning.
     * This is always false when the infestation is attacking
     * @returns {boolean}
     */
    isAttackerWinning(): boolean;
    /**
     * Get an estimation of how much time is left before the invasion ends in milliseconds
     * @returns {number}
     */
    getRemainingTime(): number;
    /**
     * Get a string estimating how much time is left before the invasion ends
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get the types of the items being rewarded in the invasion
     * @returns {Array.<string>}
     */
    getRewardTypes(): string[];
    /**
     * The invasion's string representation
     * @returns {string}
     */
    toString(): string;
}

/**
 * @param   {Object}             data            The mission data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {Reward}             deps.Reward     The Reward parser
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class Mission {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        Reward: Reward;
        locale: string;
    });
    /**
     * The mission's description
     * @type {?string}
     */
    description: string;
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
    reward: Reward;
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
    maxWaveNum: number;
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
     * The Mission's string representation
     * @returns {string}
     */
    toString(): string;
}

/**
 * @param   {Object}             data            The news data
 * @param   {Dependency}         deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 */
declare class News extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        timeDate: TimeDateFunctions;
    });
    /**
     * The news message
     * @type {string}
     */
    message: string;
    /**
     * The link to the forum post
     * @type {string}
     */
    link: string;
    /**
     * The news's image link
     * @type {string}
     */
    imageLink: string;
    /**
     * Whether this has priority over other news or not
     * @type {boolean}
     */
    priority: boolean;
    /**
     * The date at which the post was published
     * @type {Date}
     */
    date: Date;
    /**
     * The date at which the event starts
     * @type {?Date}
     */
    startDate: Date;
    /**
     * The date at which the event ends
     * @type {?Date}
     */
    endDate: Date;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Whther or not this is an update news item
     * @type {boolean}
     */
    update: boolean;
    /**
     * Whther or not this is a prime access news item
     * @type {boolean}
     */
    primeAccess: boolean;
    /**
     * Whether or not this is a stream
     * @type {boolean}
     */
    stream: boolean;
    /**
     * Translation of the news item
     * @type {Object.<string, string>}
     */
    translations: {
        [key: string]: string;
    };
    /**
     * The string representation of this object at creation
     * @type {string}
     */
    asString: string;
    /**
     * Get a string indicating how long it will take for the event to start or
     * how long it's been since the news went up
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Whether or not this is about a game update
     * @returns {boolean}
     */
    isUpdate(): boolean;
    /**
     * Whether or not this is about a new Prime Access
     * @returns {boolean}
     */
    isPrimeAccess(): boolean;
    /**
     * Whether or not this is about a new Prime Access
     * @returns {boolean}
     */
    isStream(): boolean;
    /**
     * String representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The title of the new in the specified language
     * @param {string} langCode Ex. 'es', 'de', 'fr'
     * @returns {string}
     */
    getTitle(langCode: string): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The alert data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {Mission}            deps.Mission    The Mission parser
 * @param   {Reward}             deps.Reward     The Reward parser
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class Nightwave extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        Mission: Mission;
        Reward: Reward;
        locale: string;
    });
    /**
     * The current season. 0-indexed.
     * @type {Number}
     */
    season: number;
    /**
     * Descriptor for affiliation
     * @type {string}
     */
    tag: string;
    /**
     * The current season's current phase. 0-indexed.
     * @type {Number}
     */
    phase: number;
    /**
     * Misc params provided.
     * @type {Object}
     */
    params: any;
    /**
     * An array containing the types of all of the alert's rewards
     * @type {Array.<string>}
     */
    rewardTypes: string[];
    /**
     * Get a string indicating how much time is left before the alert expires
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get an array containing the types of all of the nightwave season's rewards
     * @returns {Array.<string>}
     */
    getRewardTypes(): string[];
    /**
     * The alert's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The alert data
 * @param   {Object}             deps            The dependencies object
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class NightwaveChallenge extends WorldstateObject {
    constructor(data: any, deps: {
        translator: Translator;
        timeDate: TimeDateFunctions;
        locale: string;
    });
    /**
     * Whether or not this is a daily challenge
     * @type {Boolean}
     */
    isDaily: boolean;
    /**
     * Whether or not the challenge is an elite challenge
     * @type {Boolean}
     */
    isElite: boolean;
    /**
     * The descriptor for this challenge
     * @type {string}
     */
    desc: string;
    /**
     * The title for this challenge
     * @type {string}
     */
    title: string;
    /**
     * Generated id from expiry, challenge string,
     *  and whether or not it has `[PH]` (designating placeholder text)
     * @type {string}
     */
    id: string;
    /**
     * Reputation reward for ranking up in the Nightwave
     * @type {Number}
     */
    reputation: number;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Returns a string representation of the object
     * @returns {string}
     */
    toString(): string;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The persistent enemy data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class PersistentEnemy extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        locale: string;
    });
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
    /**
     * Returns a string representation of the persistent enemy
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * An object describing a type of reward, including name, description,
 * test function to verify type from a string, thumbnail url, and color
 * @typedef {Object} RewardType
 * @property {string} name          - Name of the reward type
 * @property {string} description   - Description of the reward type
 * @property {string} test          - Function for testing the return type against a string
 * @property {string} thumbnail     - Thumbnail url for this reward type
 * @property {string} color         - Summary color representing this reward type
 */
declare type RewardType = {
    name: string;
    description: string;
    test: string;
    thumbnail: string;
    color: string;
};

/**
 * All possible RewardTypes
 * @type {Array.<RewardType>}
 */
declare var rewardTypes: RewardType[];

/**
 * Returns the type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<RewardType>}  [types] The possible types
 * @returns {string}          The type name
 */
declare function getItemType(item: string, types?: RewardType[]): string;

/**
 * Returns the full type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<RewardType>}  [types] The possible types
 * @returns {RewardType}      The type
 */
declare function getItemTypeFull(item: string, types?: RewardType[]): RewardType;

/**
 * @param   {Object} data                 The mission data
 * @param   {Object}             deps            The dependencies object
 * @param   {Translator}         deps.translator The string translator
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class Reward {
    constructor(data: any, deps: {
        translator: Translator;
        locale: string;
    });
    /**
     * The items being rewarded
     * @type {Array.<string>}
     */
    items: string[];
    /**
     * The counted items being rewarded
     * @type {Array.<Object>}
     */
    countedItems: any[];
    /**
     * The credits being rewarded
     * @type {number}
     */
    credits: number;
    /**
     * The types of all items that are being rewarded
     * @returns {Array.<string>}
     */
    getTypes(): string[];
    /**
     * The types of all the items that are being rewarded
     * @returns {Array.<RewardType>}
     */
    getTypesFull(): RewardType[];
    /**
     * The reward's string representation
     * @returns {string}
     */
    toString(): string;
}

/**
 * @param   {Object}             data            The sanctuary data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class Simaris {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        locale: string;
    });
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

/**
 * @param   {Object}            data               The data for all daily sorties
 * @param   {Object}            deps               The dependencies object
 * @param   {MarkdownSettings}  deps.mdConfig      The markdown settings
 * @param   {Translator}        deps.translator    The string translator
 * @param   {TimeDateFunctions} deps.timeDate      The time and date functions
 * @param   {Object}            deps.sortieData    The data used to parse sorties
 * @param   {SortieVariant}     deps.SortieVariant The sortie variant parser
 * @param   {string}            deps.locale        Locale to use for translations
 */
declare class Sortie extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        sortieData: any;
        SortieVariant: SortieVariant;
        locale: string;
    });
    /**
     * The date and time at which the sortie starts
     * @type {Date}
     */
    activation: Date;
    /**
     * The date and time at which the sortie ends
     * @type {Date}
     */
    expiry: Date;
    /**
     * The sortie's reward pool
     * @type {string}
     */
    rewardPool: string;
    /**
     * The sortie's variants
     * @type {Array.<SortieVariant>}
     */
    variants: SortieVariant[];
    /**
     * The sortie's boss
     * @type {string}
     */
    boss: string;
    /**
     * The sortie's faction
     * @type {string}
     */
    faction: string;
    /**
     * Whether or not this is expired (at time of object creation)
     * @type {boolean}
     */
    expired: boolean;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Get the sortie's boss
     * @returns {string}
     */
    getBoss(): string;
    /**
     * Get the sortie's faction
     * @returns {string}
     */
    getFaction(): string;
    /**
     * Gets a string indicating how long it will take for the sortie to end
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Get whether or not the sortie has expired
     * @returns {boolean}
     */
    isExpired(): boolean;
    /**
     * Returns the sortie's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}            data               Sortie variant data
 * @param   {Object}            deps               The dependencies object
 * @param   {MarkdownSettings}  deps.mdConfig      The markdown settings
 * @param   {Translator}        deps.translator    The string translator
 * @param   {Object}            deps.sortieData    The data used to parse sorties
 * @param   {string}            deps.locale        Locale to use for translations
 */
declare class SortieVariant {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        sortieData: any;
        locale: string;
    });
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

/**
 * @param   {Object}             data            The syndicate mission data
 * @param   {Date}               expiry          The syndicate job expiration
 * @param   {Object}             deps            The dependencies object
 * @param   {Translator}         deps.translator The string translator
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class SyndicateJob extends WorldstateObject {
    constructor(data: any, expiry: Date, deps: {
        translator: Translator;
        locale: string;
    });
    /**
     * Array of strings describing rewards
     * @type {string}
     */
    rewardPool: string;
    /**
     * The type of job this is
     * @type {String}
     */
    type: string;
    /**
     * Array of enemy levels
     * @type {Array.<number>}
     */
    enemyLevels: number[];
    /**
     * Array of standing gains per stage of job
     * @type {Array.<number>}
     */
    standingStages: number[];
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Returns a string representation of the object
     * @returns {string}
     */
    toString(): string;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The syndicate mission data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class SyndicateMission extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        locale: string;
    });
    /**
     * The date and time at which the syndicate mission starts
     * @type {Date}
     */
    activation: Date;
    /**
     * The date and time at which the syndicate mission ends
     * @type {Date}
     */
    expiry: Date;
    /**
     * The syndicate that is offering the mission
     * @type {string}
     */
    syndicate: string;
    /**
     * The nodes on which the missions are taking place
     * @type {Array.<string>}
     */
    nodes: string[];
    /**
     * The jobs for this syndicate. Will normally be []
     * @type {Array.<SyndicateJob>}
     */
    jobs: SyndicateJob[];
    /**
     * Unique identifier for this mission set built from the end time and syndicate
     * @type {string}
     */
    id: string;
    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    eta: string;
    /**
     * Get a string indicating how much time is left before the syndicate mission expries
     * @returns {string}
     */
    getETAString(): string;
    /**
     * Returns a string representation of the syndicate mission
     * @returns {string}
     */
    toString(): string;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * An object containing functions to format dates and times
 * @typedef {Object.<function>}           TimeDateFunctions
 * @property {function} timeDeltaToString - Converts a time difference to a string
 * @property {function} fromNow           - Returns the number of milliseconds between now and
 *                                          a given date
 * @property {function} toNow             - Returns the number of milliseconds between a given
 *                                          date and now
 */
declare type TimeDateFunctions = {
    [key: string]: any;
};

/**
 * @param   {number} millis The number of milliseconds in the time delta
 * @returns {string}
 */
declare function timeDeltaToString(millis: number): string;

/**
 * Returns the number of milliseconds between now and a given date
 * @param   {Date} d         The date from which the current time will be subtracted
 * @param   {function} [now] A function that returns the current UNIX time in milliseconds
 * @returns {number}
 */
declare function fromNow(d: Date, now?: (...params: any[]) => any): number;

/**
 * Returns the number of milliseconds between a given date and now
 * @param   {Date} d         The date that the current time will be subtracted from
 * @param   {function} [now] A function that returns the current UNIX time in milliseconds
 * @returns {number}
 */
declare function toNow(d: Date, now?: (...params: any[]) => any): number;

/**
 * Returns a new Date constructed from a worldState date object
 * @param {Object} d The worldState date object
 * @returns {Date}
 */
declare function parseDate(d: any): Date;

/**
 * An object containing functions to convert in-game names to their localizations
 * @typedef {Object.<function>} Translator
 * @property {function} faction          - Converts faction names
 * @property {function} node             - Converts star map node names
 * @property {function} nodeMissionType  - Returns the mission type of a given node
 * @property {function} nodeEnemy        - Returns the faction that controls a given node
 * @property {function} languageString   - Converts generic language strings
 * @property {function} languageDesc     - Converts generic language strings
 *                                          and retrieves the description
 * @property {function} missionType      - Converts mission types
 * @property {function} conclaveMode     - Converts conclave modes
 * @property {function} conclaveCategory - Converts conclave challenge categories
 * @property {function} fissureModifier  - Converts fissure mission modifiers
 * @property {function} syndicate        - Converts syndicate names
 * @property {function} upgrade          - Converts upgrade types
 * @property {function} operation        - Converts operation types
 * @property {function} sortieBoss       - Converts sortie boss names
 * @property {function} sortieModifer    - Converts sortie modifier types
 * @property {function} sortieModDesc    - Converts sortie modifier type descriptions
 * @property {function} region           - Converts persistent enemy region indicies
 */
declare type Translator = {
    [key: string]: any;
};

/**
 * @param   {Date}              bountiesEndDate The end date for Ostron bounties
 * @param   {Object}            deps            The dependencies object
 * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
 * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
 */
declare class VallisCycle extends WorldstateObject {
    constructor(bountiesEndDate: Date, deps: {
        mdConfig: MarkdownSettings;
        timeDate: TimeDateFunctions;
    });
    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    isWarm: boolean;
    /**
     * Time remaining string
     * @type {string}
     */
    timeLeft: string;
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * The event's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * @param   {Object}             data            The Void trader data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class VoidTrader extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        locale: string;
    });
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
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
    inventory: VoidTraderItem[];
    /**
     * Pseudo Identifier for identifying changes in inventory
     * @type {string}
     */
    psId: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * A string indicating how long it will take for the trader to leave
     *  (at time of object creation)
     * @type {string}
     */
    endString: string;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
    /**
     * Returns a string representation of the trader
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
}

/**
 * @param   {Object}             data            The challenge instance data
 * @param   {string}             data.ItemType   Worldstate Item i18n path
 * @param   {string}             data.PrimePrice Ducat cost of the item
 * @param   {string}             data.RegularPrice Credit price of the item
 * @param   {Dependency}         deps            The dependencies object
 * @param   {Translator}         deps.translator The string translator
 * @param   {string}             deps.locale     Locale to use for translations
 */
declare class VoidTraderItem {
    constructor(data: {
        ItemType: string;
        PrimePrice: string;
        RegularPrice: string;
    }, deps: {
        translator: Translator;
        locale: string;
    });
}

/**
 * @param   {Object}             data            The Void trader data
 * @param   {Object}             deps            The dependencies object
 * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
 * @param   {Translator}         deps.translator The string translator
 * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
 */
declare class WeeklyChallenge extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
    });
    /**
     * Returns a string representation of the trader
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * Interim step for an event reward system.
 * @typedef {Object} InterimStep
 *
 * @property {Number} goal          Goal amount
 * @property {Reward} reward        Reward for reaching the step
 * @property {Number} winnerCount   Amount of players at this step
 * @property {Object} message       Message received when reaching the interim step
 */
declare type InterimStep = {
    goal: number;
    reward: Reward;
    winnerCount: number;
    message: any;
};

/**
 * Progress for one of multiple stages
 * @typedef {Object} ProgessStep
 *
 * @property {string} type
 * @property {Number} progressAmt
 */
declare type ProgessStep = {
    type: string;
    progressAmt: number;
};

/**
 * @param   {Object}            data            The event data
 * @param   {Object}            deps            The dependencies object
 * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
 * @param   {Translator}        deps.translator The string translator
 * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
 * @param   {Reward}            deps.Reward     The Reward parser
 * @param   {string}            deps.locale     Locale to use for translations
 */
declare class WorldEvent extends WorldstateObject {
    constructor(data: any, deps: {
        mdConfig: MarkdownSettings;
        translator: Translator;
        timeDate: TimeDateFunctions;
        Reward: Reward;
        locale: string;
    });
    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     */
    timeDate: TimeDateFunctions;
    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    expiry: Date;
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
    smallInterval: number;
    /**
     * The second intermediate score goal
     * @type {?number}
     */
    largeInterval: number;
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
    tooltip: string;
    /**
     * The node where the event takes place
     * @type {?string}
     */
    node: string;
    /**
     * The other nodes where the event takes place
     * @type {string[]}
     */
    concurrentNodes: string[];
    /**
     * The victim node
     * @type {?string}
     */
    victimNode: string;
    /**
     * The score description
     * @type {?string}
     */
    scoreLocTag: string;
    /**
     * The event's rewards
     * @type {Reward[]}
     */
    rewards: Reward[];
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
    /**
     * Get whether or not the event has expired
     * @returns {boolean}
     */
    getExpired(): boolean;
    /**
     * The event's string representation
     * @returns {string}
     */
    toString(): string;
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}

/**
 * A collection of strings that are used by the parser to produce markdown-formatted text
 * @typedef {Object.<string>} MarkdownSettings
 * @property {string} lineEnd      - Line return character
 * @property {string} blockEnd     - Block end string
 * @property {string} doubleReturn - Double line return string
 * @property {string} linkBegin    - Link begin string
 * @property {string} linkMid      - Link middle string
 * @property {string} linkEnd      - Link end string
 * @property {string} bold         - String for denoting bold text
 * @property {string} italic       - String for denoting italicized text
 * @property {string} underline    - String for denoting underlined text
 * @property {string} strike       - String for denoting striked-through text
 * @property {string} codeLine     - String for denoting in-line code
 * @property {string} codeBlock    - String for denoting multi-line code blocks
 */
declare type MarkdownSettings = {
    [key: string]: any;
};

/**
 * Dependency Object
 * @typedef {Object} Dependency
 * @property   {MarkdownSettings}   mdConfig   The markdown settings
 * @property   {Translator}         translator The string translator
 * @property   {TimeDateFunctions}  timeDate   The time and date functions
 * @property   {Mission}            Mission    The Mission parser
 * @property   {Reward}             Reward     The Reward parser
 * @property   {string}             locale     Locale to use for translations
 */
declare type Dependency = {
    mdConfig: MarkdownSettings;
    translator: Translator;
    timeDate: TimeDateFunctions;
    Mission: Mission;
    Reward: Reward;
    locale: string;
};

/**
 * Default Dependency object
 * @type {Dependency}
 */
declare var defaultDeps: Dependency;

/**
 * @param {string} json The worldstate JSON string
 * @param {Object} [deps] The options object
 */
declare class WorldState {
    constructor(json: string, deps?: any);
    /**
     * The date and time at which the World State was generated
     * @type {Date}
     */
    timestamp: Date;
    /**
     * The in-game news
     * @type {Array.<News>}
     */
    news: News[];
    /**
     * The current events
     * @type {Array.<Event>}
     */
    events: Event[];
    /**
     * The current alerts
     * @type {Array.<Alert>}
     */
    alerts: Alert[];
    /**
     * The current syndicate missions
     * @type {Array.<SyndicateMission>}
     */
    syndicateMissions: SyndicateMission[];
    /**
     * The current fissures
     * @type {Array.<News>}
     */
    fissures: News[];
    /**
     * The current global upgrades
     * @type {Array.<GlobalUpgrade>}
     */
    globalUpgrades: GlobalUpgrade[];
    /**
     * The current flash sales
     * @type {Array.<FlashSale>}
     */
    flashSales: FlashSale[];
    /**
     * The current invasions
     * @type {Array.<Invasion>}
     */
    invasions: Invasion[];
    /**
     * The state of the dark sectors
     * @type {Array.<DarkSector>}
     */
    darkSectors: DarkSector[];
    /**
     * The current daily deals
     * @type {Array.<DailyDeal>}
     */
    dailyDeals: DailyDeal[];
    /**
     * The state of the sanctuary synthesis targets
     * @type {Simaris}
     */
    simaris: Simaris;
    /**
     * The current conclave challenges
     * @type {Array.<ConclaveChallenge>}
     */
    conclaveChallenges: ConclaveChallenge[];
    /**
     * The currently active persistent enemies
     * @type {Array.<PersistentEnemy>}
     */
    persistentEnemies: PersistentEnemy[];
    /**
     * The current earth cycle
     * @type {EarthCycle}
     */
    earthCycle: EarthCycle;
    /**
     * The current Cetus cycle
     * @type {CetusCycle}
     */
    cetusCycle: CetusCycle;
    /**
     * The Current construction progress for Fomorians/Razorback/etc.
     * @type {ConstructionProgress}
     */
    constructionProgress: ConstructionProgress;
    /**
     * The current Orb Vallis cycle state
     * @type {VallisCycle}
     */
    vallisCycle: VallisCycle;
}

/**
 * @param   {Object} data The object data
 */
declare class WorldstateObject {
    constructor(data: any);
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Returns a string representation of the object
     * @returns {string}
     */
    toString(): string;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}
