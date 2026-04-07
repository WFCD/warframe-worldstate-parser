import { createHash } from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { WorldStateObject } from './WorldStateObject';

/**
 * Represents enemy construction progress
 * @augments {WorldStateObject}
 */
export class ConstructionProgress extends WorldStateObject {
  /**
   * Fomorian construction progress percentage
   */
  @ApiProperty({ description: 'Fomorian construction progress percentage' })
  @IsString()
  fomorianProgress: string;

  /**
   * Razorback construction progress percentage
   */
  @ApiProperty({ description: 'Razorback construction progress percentage' })
  @IsString()
  razorbackProgress: string;

  /**
   * Unknown construction progress percentage
   */
  @ApiProperty({ description: 'Unknown construction progress percentage' })
  @IsString()
  unknownProgress: string;

  /**
   * @param data The construction data
   */
  constructor(data: number[]) {
    super({
      _id: {
        $oid: createHash('md5')
          .update(JSON.stringify(data), 'utf8')
          .digest('hex'),
      },
    });

    this.fomorianProgress = (data[0] ?? 0.0).toFixed(2);
    this.razorbackProgress = (data[1] ?? 0.0).toFixed(2);
    this.unknownProgress = (data[2] ?? 0.0).toFixed(2);
  }
}
