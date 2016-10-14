'use strict';

const WorldstateObject = require('./WorldstateObject.js');

class VoidTrader extends WorldstateObject {
  constructor(data, { mdConfig, timeDate, translator }) {
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

    /**
     * The date and time at which the sortie starts
     * @type {Date}
     */
    this.activation = new Date(1000 * data.Activation.sec);

    /**
     * The date and time at which the sortie ends
     * @type {Date}
     */
    this.expiry = new Date(1000 * data.Expiry.sec);

    /**
     * The void trader's name
     * @type {string}
     */
    this.character = data.Character.replace('Baro\'Ki Teel', 'Baro Ki\'Teer');

    /**
     * The node at which the Void Trader appears
     * @type {string}
     */
    this.location = translator.node(data.Node);

    /**
     * The trader's inventory
     * @type {Array}
     */
    this.inventory = data.Manifest ? data.Manifest.map(i => ({
      item: translator.languageString(i.ItemType).replace(/'S/, 's').replace(/'/, ''),
      ducats: i.PrimePrice,
      credits: i.RegularPrice,
    })) : [];
  }

  /**
   * Whether or not the trader is currently active
   * @returns {boolean}
   */
  isActive() {
    return (this.timeDate.fromNow(this.activation) < 0) && (this.timeDate.fromNow(this.expiry) > 0);
  }

  /**
   * Returns a string indicating how long it will take for the trader to arrive
   * @returns {string}
   */
  getStartString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.activation));
  }

  /**
   * Returns a string indicating how long it will take for the trader to leave
   * @returns {string}
   */
  getEndString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the trader
   * @returns {string}
   */
  toString() {
    if (!this.isActive()) {
      const timeDelta = this.timeDate.fromNow(this.activation);
      const nextArrivalTime = this.timeDate.timeDeltaToString(timeDelta);
      return `${this.mdConfig.codeMulti}${this.character} is not here yet, he will arrive in ` +
        `${nextArrivalTime} at ${this.location}${this.mdConfig.blockEnd}`;
    }

    const inventoryString = this.inventory.map(i =>
      `  ${i.item} - ${i.ducats} ducats + ${i.credits}cr%s`).join(this.mdConfig.lineEnd);

    const lines = [
      `${this.mdConfig.codeMulti}Void Trader at ${this.location}`,
      inventoryString,
      `Trader departing in ${this.getEndString()}${this.mdConfig.blockEnd}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = VoidTrader;
