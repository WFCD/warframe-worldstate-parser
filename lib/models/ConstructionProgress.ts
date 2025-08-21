import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject, { BaseContentObject, Identifier } from './WorldstateObject.js';

export interface RawConstructionProgress extends BaseContentObject {
  _id: Identifier;
  ProjectPct: number[];
}

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
  constructor(data: RawConstructionProgress) {
    super(data);

    this.fomorianProgress = (data.ProjectPct[0] || 0.0).toFixed(2);
    this.razorbackProgress = (data.ProjectPct[1] || 0.0).toFixed(2);
    this.unknownProgress = (data.ProjectPct[2] || 0.0).toFixed(2);
  }
}
