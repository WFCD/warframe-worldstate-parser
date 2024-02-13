import { parseDate, languageString } from 'warframe-worldstate-data/utilities';

import WorldstateObject from './WorldstateObject.js';
import Mission from './Mission.js';
import DarkSectorBattle from './DarkSectorBattle.js';

/**
 * Represents a dark sector
 * @augments {WorldstateObject}
 */
export default class DarkSector extends WorldstateObject {
  /**
   * @param   {object}             data                  The dark sector data
   * @param   {object}             deps                  The dependencies object
   * @param   {string}             deps.locale           Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    const deps = {
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
     * @type {boolean}
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
      ? parseDate(data.DefenderInfo.DeploymentActivationTime)
      : 0;

    /**
     * The solar rail type
     * @type {string}
     */
    this.railType = languageString(data.DefenderInfo.RailType, locale);

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
