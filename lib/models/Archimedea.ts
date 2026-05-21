import { createHash } from 'node:crypto';

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';
import type { Locale } from 'warframe-worldstate-data';
import {
  faction,
  languageDesc,
  languageString,
  missionType,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

/**
 * @deprecated use Archimedea to reference temporal and deep
 */
export type DeepArchimedea = Archimedea;

export interface RawArchimedea extends BaseContentObject {
  Type: string;
  Missions: RawArchimedeaMission[];
  Variables: string[];
}

export type Difficulty = { type: string; deviation: string; risks: string[] };

export interface RawArchimedeaMission {
  faction: string;
  missionType: string;
  difficulties: Difficulty[];
}

export class ArchimedeaMissionDifficultyRisk {
  @IsString()
  key!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsBoolean()
  isHard!: boolean;
}

export class ArchimedeaMissionDifficulty {
  @IsString()
  key!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;
}

export class PersonalModifier {
  @IsString()
  key!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;
}

/**
 * An Archimedea mission with risk and deviations
 */
export class ArchimedeaMission {
  @IsString()
  faction: string;

  @IsString()
  factionKey: string;

  @IsString()
  missionType: string;

  @IsString()
  missionTypeKey: string;

  @ValidateNested()
  @Type(() => ArchimedeaMissionDifficulty)
  deviation: ArchimedeaMissionDifficulty;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArchimedeaMissionDifficultyRisk)
  risks: ArchimedeaMissionDifficultyRisk[];

  /**
   * @param mission   Challenge mission type
   * @param locale    Locale for translation
   */
  constructor(mission: RawArchimedeaMission, locale: Locale) {
    this.faction = faction(mission.faction, locale);
    this.factionKey = faction(mission.faction, 'en');

    this.missionType = missionType(mission.missionType, locale);
    this.missionTypeKey = missionType(mission.missionType, 'en');

    const normal = mission.difficulties[0];
    this.deviation = {
      key: normal.deviation,
      name: languageString(normal.deviation, locale),
      description: languageDesc(normal.deviation, locale),
    };

    this.risks = normal.risks.map((risk) => ({
      key: risk,
      name: languageString(risk, locale),
      description: languageDesc(risk, locale),
      isHard: false,
    }));

    for (const diff of mission.difficulties.slice(1)) {
      const risks = diff.risks.slice(1).map((risk) => ({
        key: risk,
        name: languageString(risk, locale),
        description: languageDesc(risk, locale),
        isHard: diff.type === 'CD_HARD',
      }));

      this.risks.push(...risks);
    }
  }
}

export class Archimedea extends WorldStateObject {
  /**
   * MD5 generated ID
   */
  @IsString()
  id: string;

  /**
   * Archimedea type
   */
  @IsString()
  type: string;

  /**
   * Archimedea type untranslated
   */
  @IsString()
  typeKey: string;

  /**
   * Missions along with deviations and risks
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArchimedeaMission)
  missions: ArchimedeaMission[];

  /**
   * Modifiers applied to the player
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PersonalModifier)
  personalModifiers: PersonalModifier[];

  /**
   * @param data       Data to parse
   * @param locale     Locale to translate to
   */
  constructor(data: RawArchimedea, { locale }: Dependency = { locale: 'en' }) {
    super(data);

    this.id = createHash('md5')
      .update(JSON.stringify(data), 'utf8')
      .digest('hex');

    this.type = languageString(data.Type, locale);

    this.typeKey = languageString(data.Type, 'en');

    this.missions = data.Missions.map((m) => new ArchimedeaMission(m, locale));

    this.personalModifiers = data.Variables.map((i) => {
      return {
        key: i,
        name: languageString(i, locale),
        description: languageDesc(i, locale),
      };
    });
  }
}
