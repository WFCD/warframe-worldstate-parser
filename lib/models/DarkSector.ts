import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  type ContentTimestamp,
  languageString,
  parseDate,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { DarkSectorBattle, type RawDarkSectorBattle } from './DarkSectorBattle';
import { Mission, type RawMission } from './Mission';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

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
 * @augments {WorldStateObject}
 */
export class DarkSector extends WorldStateObject {
  /**
   * The dark sector credit tax rate
   */
  @ApiProperty({ description: 'The dark sector credit tax rate' })
  @IsNumber()
  @Min(0)
  creditTaxRate: number;

  /**
   * The dark sector credit tax rate for clan/alliance members
   */
  @ApiProperty({
    description: 'The dark sector credit tax rate for clan/alliance members',
  })
  @IsNumber()
  @Min(0)
  memberCreditsTaxRate: number;

  /**
   * The dark sector resource tax rate
   */
  @ApiProperty({ description: 'The dark sector resource tax rate' })
  @IsNumber()
  @Min(0)
  itemsTaxRate: number;

  /**
   * The dark sector resource tax rate for clan/alliance members
   */
  @ApiProperty({
    description: 'The dark sector resource tax rate for clan/alliance members',
  })
  @IsNumber()
  @Min(0)
  memberItemsTaxRate: number;

  /**
   * Whether the dark sector holder is an alliance or not
   */
  @ApiProperty({
    description: 'Whether the dark sector holder is an alliance or not',
  })
  @IsBoolean()
  isAlliance: boolean;

  /**
   * The current holder of the dark sector
   */
  @ApiProperty({ description: 'The current holder of the dark sector' })
  @IsString()
  defenderName: string;

  /**
   * The remaining health of the current solar rail
   */
  @ApiProperty({
    description: 'The remaining health of the current solar rail',
  })
  @IsNumber()
  @Min(0)
  defenderPoolRemaining: number;

  /**
   * The maximum health of the solar rail
   */
  @ApiProperty({ description: 'The maximum health of the solar rail' })
  @IsNumber()
  @Min(0)
  defenderMaxPool: number;

  /**
   * The date and time at which the rail was deployed
   */
  @ApiProperty({
    description: 'The date and time at which the rail was deployed',
  })
  defenderDeployemntActivation: number | Date;

  /**
   * The solar rail type
   */
  @ApiProperty({ description: 'The solar rail type' })
  @IsString()
  railType: string;

  /**
   * The MOTD set by the dark sector holder
   */
  @ApiProperty({ description: 'The MOTD set by the dark sector holder' })
  @IsString()
  defenderMOTD: string;

  /**
   * The player who deployed the solar rail
   */
  @ApiProperty({ description: 'The player who deployed the solar rail' })
  @IsString()
  deployerName: string;

  /**
   * The clan of the player who deployed the solar rail
   */
  @ApiProperty({
    description: 'The clan of the player who deployed the solar rail',
  })
  @IsString()
  deployerClan: string;

  /**
   * Defender rail heal reserve
   */
  @ApiProperty({ description: 'Defender rail heal reserve' })
  @IsNumber()
  @Min(0)
  defenderRailHealReserve: number;

  /**
   * Heal rate
   */
  @ApiProperty({ description: 'Heal rate' })
  @IsNumber()
  healRate: number;

  /**
   * Damage per mission
   */
  @ApiProperty({ description: 'Damage per mission' })
  @IsNumber()
  damagePerMission: number;

  /**
   * The dark sector's mission
   */
  @ApiPropertyOptional({
    description: "The dark sector's mission",
    type: () => Mission,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Mission)
  mission?: Mission;

  /**
   * Battle pay reserve
   */
  @ApiProperty({ description: 'Battle pay reserve' })
  @IsNumber()
  @Min(0)
  battlePayReserve: number;

  /**
   * The battle pay per mission offered to players
   * @type {number}
   */
  @ApiProperty({ description: 'The battle pay per mission offered to players' })
  @IsNumber()
  @Min(0)
  perMissionBattlePay: number;

  /**
   * The player who set the battle pay
   * @type {string}
   */
  @ApiProperty({ description: 'The player who set the battle pay' })
  @IsString()
  battlePaySetBy: string;

  /**
   * The clan of the player who set the battle pay
   * @type {string}
   */
  @ApiProperty({ description: 'The clan of the player who set the battle pay' })
  @IsString()
  battlePaySetByClan: string;

  /**
   * The player who changed the tax
   * @type {string}
   */
  @ApiProperty({ description: 'The player who changed the tax' })
  @IsString()
  taxChangedBy: string;

  /**
   * The clan of the player who set the tax
   * @type {string}
   */
  @ApiProperty({ description: 'The clan of the player who set the tax' })
  @IsString()
  taxChangedByClan: string;

  /**
   * The history of the dark sector
   * @type {Array.<DarkSectorBattle>}
   */
  @ApiProperty({
    description: 'The history of the dark sector',
    type: [DarkSectorBattle],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DarkSectorBattle)
  history: DarkSectorBattle[];

  /**
   * @param   {object}             data                  The dark sector data
   * @param   {object}             deps                  The dependencies object
   * @param   {string}             deps.locale           Locale to use for translations
   */
  constructor(
    data: RawDarkSector,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
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

    this.defenderPoolRemaining = Number.parseFloat(
      data.DefenderInfo.StrengthRemaining
    );

    this.defenderMaxPool = Number.parseFloat(data.DefenderInfo.MaxStrength);

    this.defenderDeployemntActivation = data.DefenderInfo
      .DeploymentActivationTime
      ? parseDate(data.DefenderInfo.DeploymentActivationTime)
      : 0;

    this.railType = languageString(data.DefenderInfo.RailType, locale);

    this.defenderMOTD = data.DefenderInfo.MOTD;

    this.deployerName = data.DefenderInfo.DeployerName;

    this.deployerClan = data.DefenderInfo.DeployerClan;

    this.defenderRailHealReserve = data.DefenderInfo.RailHealReserve;

    this.healRate = Number.parseFloat(data.DefenderInfo.healRate);

    this.damagePerMission = data.DefenderInfo.DamagePerMission;

    this.mission = data.DefenderInfo.MissionInfo
      ? new Mission(data.DefenderInfo.MissionInfo, deps)
      : undefined;

    this.battlePayReserve = data.DefenderInfo.BattlePayReserve;

    this.perMissionBattlePay = data.DefenderInfo.MissionBattlePay;

    this.battlePaySetBy = data.DefenderInfo.BattlePaySetBy;

    this.battlePaySetByClan = data.DefenderInfo.BattlePaySetByClan;

    this.taxChangedBy = data.DefenderInfo.TaxLastChangedBy;

    this.taxChangedByClan = data.DefenderInfo.TaxLastChangedByClan;

    this.history = data.History
      ? data.History.map((b) => new DarkSectorBattle(b))
      : [];
  }
}
