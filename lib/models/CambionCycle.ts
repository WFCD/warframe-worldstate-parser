import { fromNow } from 'warframe-worldstate-data/utilities';

import WorldstateObject from './WorldstateObject';
import CetusCycle from './CetusCycle';

/**
 * Represents the current Cambion Drift Fass/Vome Cycle
 * @augments {WorldstateObject}
 * @property {string} timeLeft time rendering of amount of time left
 */
export default class CambionCycle extends WorldstateObject {
  timeLeft: any;
  state: string;

  /**
   * @param   {CetusCycle}        cetusCycle Match data from cetus cycle for data
   */
  constructor(cetusCycle: CetusCycle) {
    super({ _id: { $oid: 'cambionCycle0' } });

    ({ activation: this.activation, expiry: this.expiry, timeLeft: this.timeLeft } = cetusCycle);

    this.state = cetusCycle.isDay ? 'fass' : 'vome';
    this.active = this.state;

    this.id = `cambionCycle${this.expiry!.getTime()}`;
  }

  /**
   * Get whether the event has expired
   */
  getExpired(): boolean {
    return fromNow(this.expiry!) < 0;
  }
}
