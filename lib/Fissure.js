'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a fissure mission
 * @extends {WorldstateObject}
 */
class Fissure extends WorldstateObject {
  /**
   * @param   {Object}             data            The fissure data
   * @param   {Object}             deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   */
  constructor(data, { translator, timeDate }) {
    super(data);

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The node where the fissure has appeared
     * @type {string}
     */
    this.node = translator.node(data.Node);

    /**
     * The fissure mission type
     * @type {string}
     */
    this.missionType = translator.nodeMissionType(data.Node);

    /**
     * The faction controlling the node where the fissure has appeared
     * @type {string}
     */
    this.enemy = translator.nodeEnemy(data.Node);

    /**
     * The fissure's tier
     * @type {string}
     */
    this.tier = translator.fissureModifier(data.Modifier);

    /**
     * The date and time at which the fissure appeared
     * @type {Date}
     */
    this.activation = new Date(1000 * data.Activation.sec);

    /**
     * The date and time at which the fissure will disappear
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.Expiry.sec);
  }

  /**
   * Get a string representation of how long the void fissure will remain active
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
