'use strict';

const Cache = require('json-fetch-cache');

const approxDuration = 1800;

const sat = () => {
  const now = Math.floor(Date.now() / 1000);
  // One cycle = 3 hours
  const cycleSeconds = now % 10800;
  // active range is after 30m and lasts for 30m
  const active = cycleSeconds > 1800 && cycleSeconds < 3600;
  const start = ((now - cycleSeconds) + 1800) * 1000;
  const end = ((now - cycleSeconds) + 3600) * 1000;

  return {
    active,
    expiry: new Date(end),
    activation: new Date(start),
  };
};

/**
 * Mission typeDef
 * @typedef {Object} Mission
 * @property {string} node Mission node name
 * @property {string} enemy Node enemy
 * @property {string} type Mission type of the node
 */

/**
 * Represents a set of sentient outposts that are present
 * @property {Mission[]} missions List of current missions
 */
class SentientOutpost {
  constructor(data = '{\\"sfn\\":000}', { translator, locale, sentientCache }) {
    const node = (data.match(/\d{3}/g) || ['000'])[0];
    const id = `CrewBattleNode${node}`;
    if (node === '000') {
      this.mission = null;
    } else {
      this.mission = {
        node: translator.node(id, locale),
        faction: translator.nodeEnemy(id, locale),
        type: translator.nodeMissionType(id, locale),
      };
    }
    ({ activation: this.activation, expiry: this.expiry } = sat());
    this.active = this.mission !== null;
    this.id = `${id}:${this.active}`;

    this.cache = sentientCache || new Cache('https://semlar.com/anomaly.json', 300000, { useEmitter: false, delayStart: true, maxRetry: 5 });
    Object.defineProperty(this, 'cache', { enumerable: false, configurable: false });
  }

  /**
   * Retrieve external data from https://10o.io/anomaly.json
   */
  async retrieve() {
    const d = await this.cache.getData();
    this.previous = {
      activation: new Date(d.start * 1000),
      expiry: new Date(d.end * 1000),
    };

    this.activation = new Date(d.projection * 1000);
    this.expiry = new Date((d.projection + approxDuration) * 1000);
  }
}

module.exports = SentientOutpost;
