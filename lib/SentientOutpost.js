'use strict';

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
  constructor(data = '{\\"sfn\\":000}', { translator, locale }) {
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
  }
}

module.exports = SentientOutpost;
