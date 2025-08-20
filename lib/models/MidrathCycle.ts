import { timeDeltaToString, fromNow } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';

import WorldstateObject from './WorldstateObject';

/**
 * Get the current Midrath cycle time
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
  private cycle = getCurrentMidrathCycle();
  
  isDay: boolean;
  state: string;
  timeLeft: string;

  constructor() {
    super({ _id: { $oid: 'midrathCycle0' } });

    this.activation = this.cycle.activation;

    this.expiry = this.cycle.expiry;

    this.isDay = this.cycle.isDay;

    this.state = this.cycle.state;

    this.timeLeft = this.cycle.timeLeft;
  }

  /**
   * Get whether or not the event has expired
   */
  getExpired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * The event's string representation
   */
  toString(): string {
    const lines = [
      `Envoy, it is currently ${this.isDay ? 'Day' : 'Night'}time in Midrath`,
      `Time remaining until ${this.isDay ? 'night' : 'day'}: ${this.timeLeft}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
