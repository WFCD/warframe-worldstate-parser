'use strict';

const WorldstateObject = require('./WorldstateObject');
const VoidTraderItem = require('./VoidTraderItem');
const VoidTraderSchedule = require('./VoidTraderSchedule');

/**
 * Represents a void trader
 * @extends {WorldstateObject}
 */
class VoidTrader extends WorldstateObject {
  /**
   * @param   {Object}             data            The Void trader data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, locale }) {
    super(data, { timeDate });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    this.activation = this.timeDate.parseDate(data.Activation);

    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    this.expiry = this.timeDate.parseDate(data.Expiry);

    /**
     * The void trader's name
     * @type {string}
     */
    this.character = data.Character ? data.Character.replace("Baro'Ki Teel", "Baro Ki'Teer") : '';

    /**
     * The node at which the Void Trader appears
     * @type {string}
     */
    this.location = translator.node(data.Node, locale);

    /**
     * The trader's inventory
     * @type {VoidTraderItem[]}
     */
    this.inventory = data.Manifest ? data.Manifest.map((i) => new VoidTraderItem(i, { translator, locale })) : [];

    /**
     * Pseudo Identifier for identifying changes in inventory
     * @type {string}
     */
    this.psId = `${this.id}${this.inventory.length}`;

    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    this.active = this.isActive();

    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    this.startString = this.getStartString();

    /**
     * A string indicating how long it will take for the trader to leave
     *  (at time of object creation)
     * @type {string}
     */
    this.endString = this.getEndString();

    this.initialStart = timeDate.parseDate(data.InitialStartDate);
    this.completed = data.Completed;
    this.schedule = data.ScheduleInfo
      ? data.ScheduleInfo.map((i) => new VoidTraderSchedule(i, { timeDate, translator, locale }))
      : [];
  }

  /**
   * Get whether or not the trader is currently active
   * @returns {boolean}
   */
  isActive() {
    return this.timeDate.fromNow(this.activation) < 0 && this.timeDate.fromNow(this.expiry) > 0;
  }

  /**
   * Get a string indicating how long it will take for the trader to arrive
   * @returns {string}
   */
  getStartString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.activation));
  }

  /**
   * Get a string indicating how long it will take for the trader to leave
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
      return (
        `${this.mdConfig.codeMulti}${this.character} is not here yet, he will arrive in ` +
        `${nextArrivalTime} at ${this.location}${this.mdConfig.blockEnd}`
      );
    }

    const inventoryString = this.inventory
      .map((i) => `  ${i.item} - ${i.ducats} ducats + ${i.credits}cr%s`)
      .join(this.mdConfig.lineEnd);

    const lines = [
      `${this.mdConfig.codeMulti}Void Trader at ${this.location}`,
      inventoryString,
      `Trader departing in ${this.getEndString()}${this.mdConfig.blockEnd}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = VoidTrader;
