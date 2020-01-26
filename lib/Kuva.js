'use strict';

const Cache = require('json-fetch-cache');

const parse = (data, translator, locale) => {
  const parsed = {
    kuva: [],
    arbitration: {},
  };

  const now = new Date();

  data.forEach((mission) => {
    const p = {
      activation: new Date(mission.start),
      expiry: new Date(mission.end),
      node: `${mission.solnodedata.tile} (${mission.solnodedata.planet})`,
      ...mission.solnodedata,
      type: translator.nodeMissionType(mission.solnode, locale),
    };
    p.expiry.setHours(p.activation.getHours() + 1);
    p.expiry.setMinutes(4);
    p.expiry.setSeconds(0);
    p.expiry.setMilliseconds(0);
    p.activation.setMinutes(p.activation.getMinutes() + 5.1);
    if (p.activation < now && now < p.expiry) {
      if (mission.missiontype === 'EliteAlertMission') {
        parsed.arbitration = p;
      }
      if (mission.missiontype.startsWith('KuvaMission')) {
        parsed.kuva.push(p);
      }
    }

    delete p.solnode;
    delete p.name;
    delete p.node_type;
    delete p.tile;
    delete p.planet;
  });

  return parsed;
};

/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 * @typedef {ExternalMission}
 * @property {Date} activation start time
 * @property {Date} expiry end time
 * @property {string} solnode plain text solnode identifier
 * @property {string} node formatted node name with planet
 * @property {string} name similar to node, but different formatting
 * @property {string} tile tile on a planet
 * @property {string} planet planet the mission is on
 * @property {string} enemy Enemy on tile
 * @property {string} type Mission type of node
 * @property {string} node_type node type identifier
 * @property {boolean} archwing whether or not the tile requires archwing
 * @property {boolean} sharkwing whether or not the tile requires
 *    sumbersible archwing
 */

/**
 * Stores and parses kuva data from https://10o.io/kuvalog.json
 * @property {ExternalMission[]} kuva currently active kuva missions
 * @property {ExternalMission} arbitration current arbitration
 */
class Kuva {
  constructor({ kuvaCache, translator, locale }) {
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

    this.cache = kuvaCache || new Cache('https://10o.io/kuvalog.json', 300000, { useEmitter: false, delayStart: true, maxRetry: 5 });
    Object.defineProperty(this, 'cache', { enumerable: false, configurable: false });
  }

  /**
   * Retrieve and add data for kuva and arbitration missions
   */
  async retrieve() {
    const d = await this.cache.getData();
    ({ kuva: this.kuva, arbitration: this.arbitration } = parse(d, this.translator, this.locale));
  }
}

module.exports = Kuva;
