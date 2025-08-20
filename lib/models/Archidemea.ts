import { languageDesc, languageString } from 'warframe-worldstate-data/utilities';
import { Locale } from 'warframe-worldstate-data';

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

class ArchidemeaMission {
  mission: string;
  deviation: { key: string; name: string; description: string; };
  riskVariables: { key: string; name: string; description: string; }[];

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
  id: string;
  activation: Date;
  expiry: Date;
  missions: ArchidemeaMission[];
  personalModifiers: { key: string; name: string; description: string; }[];

  constructor(activation: Date, expiry: Date, data: RawArchimedea, locale: Locale = 'en') {
    this.id = `${activation}Archimedea`;

    this.activation = activation;

    this.expiry = expiry;

    this.missions = data.mt.map((m, i) => new ArchidemeaMission(m, data.mv[i], data.c[i], locale));

    this.personalModifiers = data.fv.map((i) => {
      return { key: i, name: languageString(i, locale), description: languageDesc(i, locale) };
    });
  }
}
