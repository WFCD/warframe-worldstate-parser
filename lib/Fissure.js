'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a fissure mission
 */
class Fissure extends WorldstateObject {
  /**
   * @param   {Object} data                       The fissure data
   * @param   {Object} options.translator         The string translator
   * @param   {Object} options.timeDate           The time and date functions
   */
  constructor(data, { translator, timeDate }) {
    super(data);

    /**
     * The time and date functions
     * @type {function}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The fissure node
     * @type {string}
     */
    this.node = translator.node(data.Node);

    /**
     * The fissure mission type
     * @type {string}
     */
    this.missionType = translator.nodeMissionType(data.Node);

    /**
     * The fissure enemy
     * @type {string}
     */
    this.enemy = translator.nodeEnemy(data.Node);

    /**
     * The fissure tier
     * @type {string}
     */
    this.tier = translator.fissureModifier(data.Modifier);

    /**
     * The activation date and time
     * @type {Date}
     */
    this.activation = new Date(1000 * data.Activation.sec);

    /**
     * The expiry date and time
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.Expiry.sec);
  }

  /**
   * Return a string representation of how long the void fissure will remain active
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the fissure
   * @returns {string}
   */
  toString() {
    return `[${this.getETAString()}] ${this.tier} fissure at ${this.node} - ${this.enemy} ${this.missionType}`;
  }
}

module.exports = Fissure;
