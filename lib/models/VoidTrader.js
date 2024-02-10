import { fromNow, parseDate, timeDeltaToString } from '../utilities/timeDate.js';
import { node } from '../utilities/translation.js';
import { insist } from '../utilities/integrity.js';
import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';
import VoidTraderItem from './VoidTraderItem.js';
import VoidTraderSchedule from './VoidTraderSchedule.js';

/**
 * Represents a void trader
 * @augments {WorldstateObject}
 */
export default class VoidTrader extends WorldstateObject {
  /**
   * @param   {object}             data            The Void trader data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);
    insist(data, 'Activation', 'Expiry');

    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    this.activation = parseDate(data.Activation);

    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    this.expiry = parseDate(data.Expiry);

    /**
     * The void trader's name
     * @type {string}
     */
    this.character = data.Character ? data.Character.replace("Baro'Ki Teel", "Baro Ki'Teer") : '';

    /**
     * The node at which the Void Trader appears
     * @type {string}
     */
    this.location = node(data.Node, locale);

    /**
     * The trader's inventory
     * @type {VoidTraderItem[]}
     */
    this.inventory = data.Manifest ? data.Manifest.map((i) => new VoidTraderItem(i, { locale })) : [];

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

    this.initialStart = parseDate(data.InitialStartDate);
    this.completed = data.Completed;
    this.schedule = data.ScheduleInfo ? data.ScheduleInfo.map((i) => new VoidTraderSchedule(i, { locale })) : [];
  }

  /**
   * Get whether or not the trader is currently active
   * @returns {boolean} whether the trader is active
   */
  isActive() {
    return fromNow(this.activation) < 0 && fromNow(this.expiry) > 0;
  }

  /**
   * Get a string indicating how long it will take for the trader to arrive
   * @returns {string} time delta string from now to the start
   */
  getStartString() {
    return timeDeltaToString(fromNow(this.activation));
  }

  /**
   * Get a string indicating how long it will take for the trader to leave
   * @returns {string} time delta string from now to the end
   */
  getEndString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the trader
   * @returns {string} string representation
   */
  toString() {
    if (!this.isActive()) {
      const timeDelta = fromNow(this.activation);
      const nextArrivalTime = timeDeltaToString(timeDelta);
      return (
        `${mdConfig.codeBlock}${this.character} is not here yet, he will arrive in ` +
        `${nextArrivalTime} at ${this.location}${mdConfig.blockEnd}`
      );
    }

    const inventoryString = this.inventory
      .map((i) => `  ${i.item} - ${i.ducats} ducats + ${i.credits}cr%s`)
      .join(mdConfig.lineEnd);

    const lines = [
      `${mdConfig.codeBlock}Void Trader at ${this.location}`,
      inventoryString,
      `Trader departing in ${this.getEndString()}${mdConfig.blockEnd}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
