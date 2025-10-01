import { type ContentTimestamp, languageString, parseDate } from 'warframe-worldstate-data/utilities';
import type Dependency from '../supporting/Dependency';
import DarkSectorBattle, { type RawDarkSectorBattle } from './DarkSectorBattle';
import Mission, { type RawMission } from './Mission';
import WorldstateObject, { type BaseContentObject } from './WorldstateObject';

export interface DefenderInfo {
  CreditsTaxRate: number;
  MemberCreditsTax: number;
  ItemsTaxRate: number;
  MemberItemsTaxRate: number;
  IsAlliance: boolean;
  Name: string;
  StrengthRemaining: string;
  MaxStrength: string;
  DeploymentActivationTime: ContentTimestamp;
  RailType: string;
  MOTD: string;
  DeployerName: string;
  DeployerClan: string;
  RailHealReserve: number;
  healRate: string;
  DamagePerMission: number;
  MissionInfo?: RawMission;
  BattlePayReserve: number;
  MissionBattlePay: number;
  BattlePaySetBy: string;
  BattlePaySetByClan: string;
  TaxLastChangedBy: string;
  TaxLastChangedByClan: string;
}

export interface RawDarkSector extends BaseContentObject {
  DefenderInfo: DefenderInfo;
  History: RawDarkSectorBattle[];
}

/**
 * Represents a dark sector
 * @augments {WorldstateObject}
 */
export default class DarkSector extends WorldstateObject {
  /**
   * The dark sector credit tax rate
   */
  creditTaxRate: number;

  /**
   * The dark sector credit tax rate for clan/alliance members
   */
  memberCreditsTaxRate: number;

  /**
   * The dark sector resource tax rate
   */
  itemsTaxRate: number;

  /**
   * The dark sector resource tax rate for clan/alliance members
   */
  memberItemsTaxRate: number;

  /**
   * Whether the dark sector holder is an alliance or not
   */
  isAlliance: boolean;

  /**
   * The current holder of the dark sector
   */
  defenderName: string;

  /**
   * The remaining health of the current solar rail
   */
  defenderPoolRemaining: number;

  /**
   * The maximum health of the solar rail
   */
  defenderMaxPool: number;

  /**
   * The date and time at which the rail was deployed
   */
  defenderDeployemntActivation: number | Date;

  /**
   * The solar rail type
   */
  railType: string;

  /**
   * The MOTD set by the dark sector holder
   */
  defenderMOTD: string;

  /**
   * The player who deployed the solar rail
   */
  deployerName: string;

  /**
   * The clan of the player who deployed the solar rail
   */
  deployerClan: string;
  defenderRailHealReserve: number;
  healRate: number;
  damagePerMission: number;

  /**
   * The dark sector's mission
   */
  mission?: Mission;
  battlePayReserve: number;

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
   * @param   {object}             data                  The dark sector data
   * @param   {object}             deps                  The dependencies object
   * @param   {string}             deps.locale           Locale to use for translations
   */
  constructor(data: RawDarkSector, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);

    const deps = {
      locale,
    };

    this.creditTaxRate = data.DefenderInfo.CreditsTaxRate;

    this.memberCreditsTaxRate = data.DefenderInfo.MemberCreditsTax;

    this.itemsTaxRate = data.DefenderInfo.ItemsTaxRate;

    this.memberItemsTaxRate = data.DefenderInfo.MemberItemsTaxRate;

    this.isAlliance = data.DefenderInfo.IsAlliance;

    this.defenderName = data.DefenderInfo.Name;

    this.defenderPoolRemaining = Number.parseFloat(data.DefenderInfo.StrengthRemaining);

    this.defenderMaxPool = Number.parseFloat(data.DefenderInfo.MaxStrength);

    this.defenderDeployemntActivation = data.DefenderInfo.DeploymentActivationTime
      ? parseDate(data.DefenderInfo.DeploymentActivationTime)
      : 0;

    this.railType = languageString(data.DefenderInfo.RailType, locale);

    this.defenderMOTD = data.DefenderInfo.MOTD;

    this.deployerName = data.DefenderInfo.DeployerName;

    this.deployerClan = data.DefenderInfo.DeployerClan;

    this.defenderRailHealReserve = data.DefenderInfo.RailHealReserve;

    this.healRate = Number.parseFloat(data.DefenderInfo.healRate);

    this.damagePerMission = data.DefenderInfo.DamagePerMission;

    this.mission = data.DefenderInfo.MissionInfo ? new Mission(data.DefenderInfo.MissionInfo, deps) : undefined;

    this.battlePayReserve = data.DefenderInfo.BattlePayReserve;

    this.perMissionBattlePay = data.DefenderInfo.MissionBattlePay;

    this.battlePaySetBy = data.DefenderInfo.BattlePaySetBy;

    this.battlePaySetByClan = data.DefenderInfo.BattlePaySetByClan;

    this.taxChangedBy = data.DefenderInfo.TaxLastChangedBy;

    this.taxChangedByClan = data.DefenderInfo.TaxLastChangedByClan;

    this.history = data.History ? data.History.map((b) => new DarkSectorBattle(b)) : [];
  }
}
