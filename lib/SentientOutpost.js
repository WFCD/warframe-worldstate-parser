'use strict';

/**
 * Mission typeDef
 * @typedef {Object} Mission
 * @property {string} node Mission node name
 * @property {string} enemy Node enemy
 * @property {striing} type Mission type of the node
 */

/**
 * Represents a set of sentient outposts that are present
 * @property {Mission[]} missions List of current missions
 */
class SentientOutpost {
  constructor(data = '{\\"sfn\\":000}', { translator, locale }) {
    const node = (data.match(/\d{3}/g) || ['000'])[0];
    const id = `CrewBattleNode${node}`;
    this.mission = {
      node: translator.node(id, locale),
      faction: translator.nodeEnemy(id, locale),
      type: translator.nodeMissionType(id, locale),
    };
  }
}

module.exports = SentientOutpost;
