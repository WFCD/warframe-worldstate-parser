import { languageDesc, languageString } from 'warframe-worldstate-data/utilities';

class DeepArchidemeaMission {
  constructor(mission, deviation, risks, locale) {
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

export default class DeepArchimedea {
  constructor(activation, expiry, data, locale = 'en') {
    this.id = `${new Date(activation).getTime()}DeepArchimedea`;

    this.activation = activation;

    this.expiry = expiry;

    this.missions = data.mt.map((m, i) => new DeepArchidemeaMission(m, data.mv[i], data.c[i], locale));

    this.personalModifiers = data.fv.map((i) => {
      return { key: i, name: languageString(i, locale), description: languageDesc(i, locale) };
    });
  }
}
