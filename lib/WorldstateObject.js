'use strict';

/**
 * Represents a generic ojbect from Worldstate
 */
class WorldstateObject {
  /**
   * @param   {Object} data The object data
   */
  constructor(data, { timeDate }) {
    /**
     * The object's id field
     * @type {string}
     */
    // eslint-disable-next-line no-underscore-dangle
    this.id = data._id ? data._id.$oid || data._id.$id : undefined;

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    if (data.Activation) {
      /**
       * The date and time at which the void trader arrives
       * @type {Date}
       */
      this.activation = timeDate.parseDate(data.Activation);

      /**
       * A string indicating how long it will take for the trader to arrive
       *  (at time of object creation)
       * @type {string}
       */
      this.startString = this.getStartString();
    }

    if (data.Expiry) {
      /**
       * The date and time at which the void trader leaves
       * @type {Date}
       */
      this.expiry = timeDate.parseDate(data.Expiry);
    }

    if (data.Activation && data.Expiry) {
      /**
       * Whether or not the void trader is active (at time of object creation)
       * @type {boolean}
       */
      this.active = this.isActive();
    }
  }

  /**
   * Returns a string representation of the object
   * @returns {string}
   */
  toString() {
    return `id: ${this.id}`;
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
}

module.exports = WorldstateObject;
