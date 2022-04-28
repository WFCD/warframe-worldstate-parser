'use strict';

/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 * @typedef {Object} ExternalMission
 * @property {Date} activation start time
 * @property {Date} expiry end timer
 * @property {string} node formatted node name with planet
 * @property {string} enemy Enemy on tile
 * @property {string} type Mission type of node
 * @property {boolean} archwing whether or not the tile requires archwing
 * @property {boolean} sharkwing whether or not the tile requires
 *    sumbersible archwing
 */

/**
 * Stores and parses kuva data from https://10o.io/kuvalog.json
 * @typedef {Object} Kuva
 * @property {ExternalMission[]} kuva currently active kuva missions
 * @property {ExternalMission} arbitration current arbitration
 */

const HOURS_2 = 7200000;

/**
 * Truncate time for a semlar-provided mission
 * @param  {Object} mission parsed mission with re-aligned field names
 */
const truncateTime = (mission) => {
  mission.expiry.setHours(mission.activation.getHours() + 1);
  mission.expiry.setMinutes(4);
  mission.expiry.setSeconds(0);
  mission.expiry.setMilliseconds(0);
  mission.activation.setMinutes(mission.activation.getMinutes() + 5.1);
};

/**
 * Scrub unnecessary details from the mission
 * @param  {Object} mission parsed mission with re-aligned field names
 */
const scrub = (mission) => {
  /* eslint-disable no-param-reassign */
  delete mission.solnode;
  delete mission.name;
  delete mission.node_type;
  delete mission.tile;
  delete mission.planet;
  /* eslint-enable no-param-reassign */
};

/**
 * Parse kuva & arbitration data
 * @param  {Object} data       Data to split for kuva/arbitration
 * @param  {Object.<function>} translator Translator functions
 * @param  {string} locale     locale to translate
 * @returns {Kuva}           Split parsed data
 */
const parse = (data, translator, locale) => {
  const parsed = { kuva: [], arbitration: {} };
  const now = new Date();
  data.forEach((mission) => {
    const p = {
      activation: new Date(mission.start),
      expiry: new Date(mission.end),
      ...mission.solnodedata,
      node: translator.node(mission.solnode, locale),
      type: translator.nodeMissionType(mission.solnode, locale),
    };
    truncateTime(p);
    if (
      p.activation < now &&
      now < p.expiry &&
      new Date(p.activation.getTime() + HOURS_2) > now &&
      new Date(p.expiry.getTime() - HOURS_2) < now
    ) {
      if (mission.missiontype === 'EliteAlertMission') {
        // if the diff is less than 2 hours?
        parsed.arbitration = p;
      }
      if (mission.missiontype.startsWith('KuvaMission')) parsed.kuva.push(p);
    }
    scrub(p);
  });
  parsed.kuva = new Array(...new Set(parsed.kuva));

  return parsed;
};

/**
 * Stores and parses kuva data from https://10o.io/kuvalog.json
 * @property {ExternalMission[]} kuva currently active kuva missions
 * @property {ExternalMission} arbitration current arbitration
 */
class Kuva {
  constructor({ kuvaData, translator, locale, logger }) {
    /**
     * The translation functions
     * @type {Translator}
     * @private
     */
    this.translator = translator;
    Object.defineProperty(this, 'translator', { enumerable: false, configurable: false });

    /**
     * The locale to leverage for translations
     * @type {string}
     * @private
     */
    this.locale = locale;
    Object.defineProperty(this, 'locale', { enumerable: false, configurable: false });

    if (!kuvaData) {
      // eslint-ignore-next-line no-console
      logger.debug('No defined kuva data, skipping data');
    } else {
      const parsed = parse(kuvaData, this.translator, this.locale);
      ({ kuva: this.kuva, arbitration: this.arbitration } = parsed);
    }
  }
}

module.exports = Kuva;
