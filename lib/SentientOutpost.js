'use strict';

const duration = 1800;

const sat = () => {
  const now = Math.floor(Date.now() / 1000);
  // One cycle = 3 hours
  const cycleSeconds = now % duration;
  // active range is after 30m and lasts for 30m
  const active = cycleSeconds > 0 && cycleSeconds < 1800;
  const start = ((now - cycleSeconds)) * 1000;
  const end = ((now - cycleSeconds) + duration) * 1000;

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
 * Parsed source is combined data from DE's worldstate and semlar.com/anomaly.json
 * @property {Mission} mission    List of current missions
 * @property {string}  id         Identifier for the mission node with active indicator
 * @property {boolean} active     Whether or not the mission is active
 * @property {Date}    activation When the mission became or becomes active
 * @property {Date}    expiry     When the mission became or becomes inactive
 * @property {Object}  previous   Estimation data for the last mission that was active.
 *                                Could also be the current.
 * @property {Date}    previous.activation  When the mission became or becomes active
 * @property {Date}    previous.expiry     When the mission became or becomes inactive
 */
class SentientOutpost {
  constructor(data = '{\\"sfn\\":000}', {
    translator, locale,
  }) {
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
  }
}

module.exports = SentientOutpost;
