'use strict';

const WorldstateObject = require('./WorldstateObject');

/**
 * Represents the current Cambion Drift Fass/Vome Cycle
 * @extends {WorldstateObject}
 */
class CambionCycle extends WorldstateObject {
  /**
   * @param   {CetusCycle}        cetusCycle Match data from cetus cycle for data
   * @param   {Object}            deps            The dependencies object
   * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
   */
  constructor(cetusCycle, { timeDate }) {
    super({ _id: { $oid: 'cambionCycle0' } }, { timeDate });

    ({
      activation: this.activation,
      expiry: this.expiry,
    } = cetusCycle);

    this.active = cetusCycle.isDay ? 'fass' : 'vome';

    this.id = `cambionCycle${this.expiry.getTime()}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }
}

module.exports = CambionCycle;
