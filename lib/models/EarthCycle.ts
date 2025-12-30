import { fromNow } from 'warframe-worldstate-data/utilities';

import { WorldStateObject } from './WorldStateObject';

export interface EarthCycleType {
  /**
   * Whether or not this it's daytime
   */
  dayTime: boolean;

  /**
   * Time remaining string
   */
  timeLeft: string;

  /**
   * The date and time at which the event ends
   */
  expiry: Date;

  /**
   * Time it expires in
   */
  expiresIn: number;

  /**
   * The date and time at which the event ends, rounded to the nearest minute
   */
  rounded: Date;

  /**
   * Current cycle state. One of `day`, `night`
   */
  state: string;

  /**
   *  The date and time at which the event started, 4 hours before the end
   */
  start: Date;
}

/**
 * Get the current Earth Day/Night Cycle
 * @returns {EarthCycle} The current Earth Day/Night Cycle
 */
function getCurrentEarthCycle(): EarthCycleType {
  const now = Date.now();
  const cycleSeconds = Math.floor(now / 1000) % 28800; // One cycle = 8 hours = 28800 seconds
  const dayTime = cycleSeconds < 14400;

  let secondsLeft = 14400 - (cycleSeconds % 14400);
  const millisLeft = secondsLeft * 1000;
  const expiry = new Date(now + secondsLeft * 1000);

  const minutesCoef = 1000 * 60;
  const rounded = new Date(
    Math.round((now + millisLeft) / minutesCoef) * minutesCoef
  );

  const timePieces = [];
  if (secondsLeft > 3600) {
    timePieces.push(`${Math.floor(secondsLeft / 3600)}h`);
    secondsLeft %= 3600;
  }
  if (secondsLeft > 60) {
    timePieces.push(`${Math.floor(secondsLeft / 60)}m`);
    secondsLeft %= 60;
  }
  timePieces.push(`${secondsLeft}s`);

  return {
    dayTime,
    timeLeft: timePieces.join(' '),
    expiry,
    expiresIn: millisLeft,
    rounded,
    state: dayTime ? 'day' : 'night',
    start: new Date(expiry.getTime() - 1000 * 60 * 60 * 4), // start is 4h before end
  };
}

/**
 * Represents the current Earth Day/Night Cycle
 * @augments {WorldStateObject}
 */
export class EarthCycle extends WorldStateObject {
  #ec = getCurrentEarthCycle();

  /**
   * Whether or not this it's daytime
   */
  isDay: boolean;

  /**
   * Current cycle state. One of `day`, `night`
   */
  state: string;

  /**
   * Time remaining string
   */
  timeLeft: string;

  constructor() {
    super({ _id: { $oid: 'earthCycle0' } });

    this.expiry = this.#ec.expiry;

    this.activation = this.#ec.start;

    this.isDay = this.#ec.dayTime;

    this.state = this.#ec.state;

    this.timeLeft = this.#ec.timeLeft;

    this.id = `earthCycle${this.#ec.rounded.getTime()}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean} Whether or not the event has expired
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }
}
