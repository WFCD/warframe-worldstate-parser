import WorldstateObject from './WorldstateObject.js';
import { fromNow } from '../utilities/timeDate.js';

/**
 * Represents the current Cambion Drift Fass/Vome Cycle
 * @extends {WorldstateObject}
 * @property {string} timeLeft time rendering of amount of time left
 */
export default class CambionCycle extends WorldstateObject {
  /**
   * @param   {CetusCycle}        cetusCycle Match data from cetus cycle for data
   */
  constructor(cetusCycle) {
    super({ _id: { $oid: 'cambionCycle0' } });

    ({ activation: this.activation, expiry: this.expiry, timeLeft: this.timeLeft } = cetusCycle);

    this.state = cetusCycle.isDay ? 'fass' : 'vome';
    this.active = this.state;

    this.id = `cambionCycle${this.expiry.getTime()}`;
  }

  /**
   * Get whether the event has expired
   * @returns {boolean}
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
  }
}
