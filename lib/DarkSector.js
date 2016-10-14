'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a dark sector
 */
class DarkSector extends WorldstateObject {
  /**
   * @param   {Object} data                        The dark sector data
   * @param   {Object} options.translator        The string translator
   * @param   {Object} options.Mission           The mission parser
   * @param   {Object} options.DarkSectorHistory The dark sector battle parser
   */
  constructor(data, { translator, Mission, DarkSectorBattle, mdConfig, Reward }) {
    super(data);

    const opts = { translator, Mission, DarkSectorBattle, mdConfig, Reward };

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
    this.defenderPoolRemaining = data.DefenderInfo.StrengthRemaining;

    /**
     * The maximum health of the solar rail
     * @type {number}
     */
    this.defenderMaxPool = data.DefenderInfo.MaxStrength;

    /**
     * The date and time at which the rail was deployed
     * @type {Date}
     */
    this.defenderDeployemntActivation =
      new Date(1000 * data.DefenderInfo.DeploymentActivationTime.sec);

    /**
     * The solar rail type
     * @type {string}
     */
    this.railType = translator.languageString(data.DefenderInfo.RailType);

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

    this.healRate = data.DefenderInfo.healRate;

    this.damagePerMission = data.DefenderInfo.DamagePerMission;

    /**
     * The dark sector's mission
     * @type {Mission}
     */
    this.mission = new Mission(data.DefenderInfo.MissionInfo, opts);

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
     * @type {Array.<DarkSectorHistory>}
     */
    this.history = data.History.map(b => new DarkSectorBattle(b, opts));
  }
}

module.exports = DarkSector;
