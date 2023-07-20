'use strict';

const WorldstateObject = require('./WorldstateObject');

/**
 * Represents enemy construction progress
 * @extends {WorldstateObject}
 */
class ConstructionProgress extends WorldstateObject {
  /**
   * @param   {Object}             data            The construction data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   */
  constructor(data, { mdConfig, timeDate }) {
    super(data, { timeDate });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

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
      `${this.mdConfig.codeMulti}Fomorian: ${this.fomorianProgress}%${this.mdConfig.lineEnd}Razorback: ` +
      `${this.razorbackProgress}%${this.mdConfig.lineEnd}Unknown: ${this.unknownProgress}%${this.mdConfig.blockEnd}`
    );
  }
}

module.exports = ConstructionProgress;
