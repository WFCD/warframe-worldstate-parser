import { createHash } from 'node:crypto';

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

export interface ArchimedeaMissionDifficultyRisk {
  key: string;
  name: string;
  description: string;
  isHard: boolean;
}

export interface ArchimedeaMissionDifficulty {
  key: string;
  name: string;
  description: string;
}

/**
 * An Archimedea mission with risk and deviations
 */
export class ArchimedeaMission {
  faction: string;

  factionKey: string;

  missionType: string;

  missionTypeKey: string;

  deviation: ArchimedeaMissionDifficulty;

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
  id: string;

  /**
   * Archimedea type
   */
  type: string;

  /**
   * Archimedea type untranslated
   */
  typeKey: string;

  /**
   * Missions along with deviations and risks
   */
  missions: ArchimedeaMission[];

  /**
   * Modifiers applied to the player
   */
  personalModifiers: { key: string; name: string; description: string }[];

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
