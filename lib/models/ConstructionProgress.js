import WorldstateObject from './WorldstateObject.js';
import mdConfig from '../supporting/MarkdownSettings.js';

/**
 * Represents enemy construction progress
 * @extends {WorldstateObject}
 */
export default class ConstructionProgress extends WorldstateObject {
  /**
   * @param   {Object}             data            The construction data
   */
  constructor(data) {
    super(data);

    this.fomorianProgress = (data.ProjectPct[0] || 0.0).toFixed(2);
    this.razorbackProgress = (data.ProjectPct[1] || 0.0).toFixed(2);
    this.unknownProgress = (data.ProjectPct[2] || 0.0).toFixed(2);
  }

  /**
   * The alert's string representation
   * @returns {string}
   */
  toString() {
    return (
      `${mdConfig.codeMulti}Fomorian: ${this.fomorianProgress}%${mdConfig.lineEnd}Razorback: ` +
      `${this.razorbackProgress}%${mdConfig.lineEnd}Unknown: ${this.unknownProgress}%${mdConfig.blockEnd}`
    );
  }
}
