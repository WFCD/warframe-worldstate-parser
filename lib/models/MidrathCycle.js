import { timeDeltaToString, fromNow } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';

/**
 * @typedef {object} MidrathCycle
 * @property {Date} expiry The date and time at which the event ends
 * @property {Date} activation The date and time at which the event started
 * @property {boolean} isDay Whether or not this it's daytime
 * @property {string} state Current cycle state. One of `day`, `night`
 * @property {string} timeLeft Time remaining string
 * @property {boolean} expired Whether or not the event has expired
 */

/**
 * Get the current Midrath cycle time
 * @returns {MidrathCycle} Current midrath cycle time
 */
function getCurrentMidrathCycle() {
  const dayDuration = 32 * 60 * 1000; // 32 minutes in milliseconds
  const nightDuration = 16 * 60 * 1000; // 16 minutes in milliseconds
  const totalDuration = dayDuration + nightDuration;

  const refPoint = Date.parse('2025-08-07T16:05:29Z');
  const now = Date.now();
  const elapsedInCycle = (now - refPoint) % totalDuration;
  const isDay = elapsedInCycle < dayDuration;

  let phase = {
    name: 'night',
    remaining: totalDuration - elapsedInCycle,
    duration: nightDuration,
  };

  if (isDay) {
    phase = {
      name: 'day',
      remaining: dayDuration - elapsedInCycle,
      duration: dayDuration,
    };
  }

  const activation = new Date(now - (phase.duration - phase.remaining));
  const expiry = new Date(activation.getTime() + phase.duration);
  const timeLeft = timeDeltaToString(phase.remaining);

  return {
    activation,
    expiry,
    state: phase.name,
    timeLeft,
    isDay,
  };
}

export default class MidrathCycle extends WorldstateObject {
  #mc = getCurrentMidrathCycle();
  constructor() {
    super({ _id: { $oid: 'midrathCycle0' } });

    this.activation = this.#mc.activation;

    this.expiry = this.#mc.expiry;

    this.isDay = this.#mc.isDay;

    this.state = this.#mc.state;

    this.timeLeft = this.#mc.timeLeft;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean} Whether or not the event has expired
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
  }

  /**
   * The event's string representation
   * @returns {string} The string representation of the event
   */
  toString() {
    const lines = [
      `Envoy, it is currently ${this.isDay ? 'Day' : 'Night'}time in Midrath`,
      `Time remaining until ${this.isDay ? 'night' : 'day'}: ${this.timeLeft}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
