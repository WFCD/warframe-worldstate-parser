import { createHash } from 'node:crypto';
import type { Locale } from 'warframe-worldstate-data';
import { languageDesc, languageString, weeklyReset } from 'warframe-worldstate-data/utilities';

/**
 * @deprecated use Archimedea to reference temporal and deep
 */
export type DeepArchimedea = Archimedea;

export interface RawArchimedea {
  mt: string[];
  mv: string[];
  c: string[][];
  fv: string[];
}

/**
 * An Archimedea mission with risk and deviations
 */
export class ArchimedeaMission {
  mission: string;
  deviation: { key: string; name: string; description: string };
  riskVariables: { key: string; name: string; description: string }[];

  /**
   * @param mission   Challenge mission type
   * @param deviation Mission deviation
   * @param risks     Mission risks
   * @param locale    Locale to tranlslate to
   */
  constructor(mission: string, deviation: string, risks: string[], locale: Locale) {
    this.mission = mission;

    this.deviation = {
      key: deviation,
      name: languageString(deviation, locale),
      description: languageDesc(deviation, locale),
    };

    this.riskVariables = risks.map((i) => {
      return { key: i, name: languageString(i, locale), description: languageDesc(i, locale) };
    });
  }
}

export default class Archimedea {
  /**
   * MD5 generated ID
   */
  id: string;

  /**
   * Start date
   */
  activation: Date;
  
  /**
   * End date
   */
  expiry: Date;

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
  constructor(data: RawArchimedea, locale: Locale = 'en') {
    ({ activation: this.activation, expiry: this.expiry } = weeklyReset());

    this.id = createHash('md5').update(JSON.stringify(data), 'utf8').digest('hex');

    this.missions = data.mt.map((m, i) => new ArchimedeaMission(m, data.mv[i], data.c[i], locale));

    this.personalModifiers = data.fv.map((i) => {
      return { key: i, name: languageString(i, locale), description: languageDesc(i, locale) };
    });
  }
}
