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
      solnode: mission.solnode,
      node: `${mission.solnodedata.tile} (${mission.solnodedata.planet})`,
      ...mission.solnodedata,
      type: translator.nodeMissionType(mission.solnode, locale),
    };
    p.activation.setMinutes(p.activation.getMinutes() + 5.1);
    if (p.activation < now && now < p.expiry) {
      if (mission.missiontype === 'EliteAlertMission') {
        parsed.arbitration = p;
      }
      if (mission.missiontype.startsWith('KuvaMission')) {
        parsed.kuva.push(p);
      }
    }
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
    this.cache = kuvaCache || new Cache('https://10o.io/kuvalog.json', 300000, { useEmitter: false, delayStart: true, maxRetry: 5 });
    this.cache.getData()
      .then((data) => {
        const parsed = parse(data, translator, locale);
        this.kuva = parsed.kuva;
        this.arbitration = parsed.arbitration;
      });
  }
}

module.exports = Kuva;
