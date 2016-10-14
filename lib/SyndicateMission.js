'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a syndicate daily mission
 */
class SyndicateMission extends WorldstateObject {
  /**
   * @param   {Object} data               The syndicate mission data
   * @param   {Object} options.timeDate   Time and date functions
   * @param   {Object} options.translator The string translator
   * @param   {Object} options.mdConfig   The markdown configuration
   */
  constructor(data, { timeDate, translator, mdConfig }) {
    super(data);

    /**
     * The time and date functions
     * @type {Object}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    this.activation = new Date(1000 * data.Activation.sec);

    this.expiry = new Date(1000 * data.Expiry.sec);

    this.syndicate = translator.syndicate(data.Tag);

    this.nodes = data.Nodes.map(n => translator.node(n));
  }

  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  toString() {
    if (this.nodes.length > 0) {
      const missions = this.nodes.map(n => `  \u2022${n.toString()}`).join(this.mdConfig.lineEnd);
      return `[${this.getETAString()}] ${this.syndicate} currently has missions on: ` +
        `${this.mdConfig.lineEnd}${missions}`;
    }

    return `No missions available for ${this.syndicate}`;
  }
}

module.exports = SyndicateMission;
