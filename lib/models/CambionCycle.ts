import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { fromNow } from 'warframe-worldstate-data/utilities';

import type { CetusCycle } from './CetusCycle';
import { WorldStateObject } from './WorldStateObject';

/**
 * Represents the current Cambion Drift Fass/Vome Cycle
 * @augments {WorldStateObject}
 */
export class CambionCycle extends WorldStateObject {
  /**
   * Time remaining string in the current cycle
   */
  @ApiProperty({ description: 'Time remaining in the current cycle' })
  @IsString()
  timeLeft: string;

  /**
   * Current cycle state. One of 'fass', 'vome'
   */
  @ApiProperty({ description: "Current cycle state. One of 'fass', 'vome'" })
  @IsString()
  state: string;

  /**
   * @param {CetusCycle} cetusCycle Match data from cetus cycle for data
   */
  constructor(cetusCycle: CetusCycle) {
    super({ _id: { $oid: 'cambionCycle0' } });

    ({
      activation: this.activation,
      expiry: this.expiry,
      timeLeft: this.timeLeft,
    } = cetusCycle);

    this.state = cetusCycle.isDay ? 'fass' : 'vome';

    this.id = `cambionCycle${this.expiry!.getTime()}`;
  }

  /**
   * Get whether the event has expired
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }
}
