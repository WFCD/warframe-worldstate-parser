import { createHash } from 'node:crypto';
import WorldstateObject from './WorldstateObject.js';

/**
 * Represents enemy construction progress
 * @augments {WorldstateObject}
 */
export default class ConstructionProgress extends WorldstateObject {
  fomorianProgress: string;
  razorbackProgress: string;
  unknownProgress: string;

  /**
   * @param data The construction data
   */
  constructor(data: number[]) {
    super({
      _id: {
        $oid: createHash('md5').update(JSON.stringify(data), 'utf8').digest('hex'),
      },
    });
    

    this.fomorianProgress = (data[0] ?? 0.0).toFixed(2);
    this.razorbackProgress = (data[1] ?? 0.0).toFixed(2);
    this.unknownProgress = (data[2] ?? 0.0).toFixed(2);
  }
}
