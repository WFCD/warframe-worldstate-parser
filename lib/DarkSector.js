'use strict';

const WorldstateObject = require('./WorldstateObject');

/**
 * Represents a dark sector
 * @extends {WorldstateObject}
 */
class DarkSector extends WorldstateObject {
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
  constructor(data, { mdConfig, translator, timeDate, Mission, DarkSectorBattle, Reward, locale }) {
    super(data, { timeDate });

    const deps = {
      translator,
      Mission,
      DarkSectorBattle,
      mdConfig,
      Reward,
      timeDate,
      locale,
    };

    /**
     * The dark sector credit tax rate
     * @type {number}
     */
    this.creditTaxRate = data.DefenderInfo.CreditsTaxRate;

    /**
     * The dark sector credit tax rate for clan/alliance members
     * @type {number}
     */
    this.memberCreditsTaxRate = data.DefenderInfo.MemberCreditsTax;

    /**
     * The dark sector resource tax rate
     * @type {number}
     */
    this.itemsTaxRate = data.DefenderInfo.ItemsTaxRate;

    /**
     * The dark sector resource tax rate for clan/alliance members
     * @type {number}
     */
    this.memberItemsTaxRate = data.DefenderInfo.MemberItemsTaxRate;

    /**
     * Whether the dark sector holder is an alliance or not
     * @type {Boolean}
     */
    this.isAlliance = data.DefenderInfo.IsAlliance;

    /**
     * The current holder of the dark sector
     * @type {string}
     */
    this.defenderName = data.DefenderInfo.Name;

    /**
     * The remaining health of the current solar rail
     * @type {number}
     */
    this.defenderPoolRemaining = Number.parseFloat(data.DefenderInfo.StrengthRemaining);

    /**
     * The maximum health of the solar rail
     * @type {number}
     */
    this.defenderMaxPool = Number.parseFloat(data.DefenderInfo.MaxStrength);

    /**
     * The date and time at which the rail was deployed
     * @type {Date}
     */
    this.defenderDeployemntActivation = data.DefenderInfo.DeploymentActivationTime
      ? timeDate.parseDate(data.DefenderInfo.DeploymentActivationTime)
      : 0;

    /**
     * The solar rail type
     * @type {string}
     */
    this.railType = translator.languageString(data.DefenderInfo.RailType, locale);

    /**
     * The MOTD set by the dark sector holder
     * @type {string}
     */
    this.defenderMOTD = data.DefenderInfo.MOTD;

    /**
     * The player who deployed the solar rail
     * @type {string}
     */
    this.deployerName = data.DefenderInfo.DeployerName;

    /**
     * The clan of the player who deployed the solar rail
     * @type {string}
     */
    this.deployerClan = data.DefenderInfo.DeployerClan;

    this.defenderRailHealReserve = data.DefenderInfo.RailHealReserve;

    this.healRate = Number.parseFloat(data.DefenderInfo.healRate);

    this.damagePerMission = data.DefenderInfo.DamagePerMission;

    /**
     * The dark sector's mission
     * @type {?Mission}
     */
    this.mission = data.DefenderInfo.MissionInfo ? new Mission(data.DefenderInfo.MissionInfo, deps) : undefined;

    this.battlePayReserve = data.DefenderInfo.BattlePayReserve;

    /**
     * The battle pay per mission offered to players
     * @type {number}
     */
    this.perMissionBattlePay = data.DefenderInfo.MissionBattlePay;

    /**
     * The player who set the battle pay
     * @type {string}
     */
    this.battlePaySetBy = data.DefenderInfo.BattlePaySetBy;

    /**
     * The clan of the player who set the battle pay
     * @type {string}
     */
    this.battlePaySetByClan = data.DefenderInfo.BattlePaySetByClan;

    /**
     * The player who changed the tax
     * @type {string}
     */
    this.taxChangedBy = data.DefenderInfo.TaxLastChangedBy;

    /**
     * The clan of the player who set the tax
     * @type {string}
     */
    this.taxChangedByClan = data.DefenderInfo.TaxLastChangedByClan;

    /**
     * The history of the dark sector
     * @type {Array.<DarkSectorBattle>}
     */
    this.history = data.History ? data.History.map((b) => new DarkSectorBattle(b, deps)) : [];
  }
}

module.exports = DarkSector;
