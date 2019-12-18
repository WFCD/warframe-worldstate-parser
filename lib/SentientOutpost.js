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
  constructor(data = { snf: '000' }, { translator, locale }) {
    const m = `CrewBattleNode${data.snf}`;
    this.missions = {
      node: translator.node(m, locale),
      faction: translator.nodeEnemy(m, locale),
      type: translator.nodeMissionType(m, locale),
    };
  }
}

module.exports = SentientOutpost;
