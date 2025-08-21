import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import WorldstateObject from './WorldstateObject';

const lStart = new Date('November 10, 2018 08:13:48 UTC');
const loopTime = 1600000;
const warmTime = 400000;
const coldTime = loopTime - warmTime;

interface CurrnetCycle {
  /**
   * Current cycle state. One of `warm`, `cold`
   */
  state: string;
  /**
   * Time remaining in the current cycle state
   */
  toNextMinor: number;
  /**
   * Time remaining until the next cycle
   */
  toNextFull: number;
  /**
   * Date and time at which the event started
   */
  timeAtPrevious: Date;
  /**
   * Date and time at which the event start
   */
  timeAtNext: Date;
}

/**
 * Get the current cycle state for Orb Vallis
 * @returns current cycle state
 */
function getCurrentCycle(): CurrnetCycle {
  const sinceLast = (Date.now() - lStart.getMilliseconds()) % loopTime;
  const toNextFull = loopTime - sinceLast;
  let state = 'cold';
  if (toNextFull > coldTime) {
    state = 'warm';
  }
  let toNextMinor: number;
  if (toNextFull < coldTime) {
    toNextMinor = toNextFull;
  } else {
    toNextMinor = toNextFull - coldTime;
  }
  const milliAtNext = Date.now() + toNextMinor;
  const milliAtPrev = Date.now() + toNextFull - (state === 'warm' ? loopTime : coldTime);
  const timeAtPrevious = new Date(milliAtPrev);
  timeAtPrevious.setSeconds(0);

  return {
    state,
    toNextMinor,
    toNextFull,
    timeAtNext: new Date(milliAtNext),
    timeAtPrevious,
  };
}

/**
 * Represents the current Earth Day/Night Cycle
 * @augments {WorldstateObject}
 */
export default class VallisCycle extends WorldstateObject {
  /**
   * Whether or not this it's daytime
   */
  isWarm: boolean;

  /**
   * Current cycle state. One of `warm`, `cold`
   */
  state: string;

  /**
   * The current cetus cycle, for calculating the other fields
   */
  private ec = getCurrentCycle();

  constructor() {
    super({ _id: { $oid: 'vallisCycle0' } });
    this.id = `vallisCycle${this.ec.timeAtPrevious.getTime()}`;
    this.activation = this.ec.timeAtPrevious;
    this.expiry = this.ec.timeAtNext;

    this.isWarm = this.ec.state === 'warm';
    this.state = this.ec.state;
  }

  /**
   * Whether this event has expired
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * Time remaining string
   */
  get timeLeft(): string {
    return timeDeltaToString(this.ec.toNextMinor);
  }

  get shortString(): string {
    return `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isWarm ? 'Cold' : 'Warm'}`;
  }
}
