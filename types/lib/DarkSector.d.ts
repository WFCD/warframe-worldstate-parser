export = DarkSector;
declare const DarkSector_base: typeof import("./WorldstateObject.js");
/**
 * Represents a dark sector
 * @extends {WorldstateObject}
 */
declare class DarkSector extends DarkSector_base {
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
    constructor(data: any, { mdConfig, translator, timeDate, Mission, DarkSectorBattle, Reward, locale, }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
        Mission: any;
        DarkSectorBattle: any;
        Reward: any;
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
    defenderRailHealReserve: any;
    healRate: number;
    damagePerMission: any;
    /**
     * The dark sector's mission
     * @type {?Mission}
     */
    mission: any;
    battlePayReserve: any;
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
    history: Array<any>;
}
