'use strict';

/**
 * @typedef {Object} Identifier
 * @property {string} $id older identifier schema
 * @property {string} $oid newer global identifier schema
 */
/**
 * @typedef {Object} LegacyTimestamp
 * @property {number} sec second-based timestamp
 */
/**
 * @typedef {Object} Timestamp
 * @property {number} $numberLong millisecond-based timestamp
 */
/**
 * @typedef {Object} ContentTimestamp
 * @property {LegacyTimestamp|Timestamp} $date timestamp number wrapper
 */
/**
 * @typedef {Object} BaseContentObject
 * @property {Identifier} _id
 * @property {ContentTimestamp} Activation
 * @property {ContentTimestamp} Expiry
 */

/**
 * Represents a generic object from Worldstate
 */
module.exports = class WorldstateObject {
  /**
   * @param   {BaseContentObject} data The object data
   * @param   {TimeDateFunctions} timeDate time date functions
   */
  constructor(data, { timeDate }) {
    /**
     * The object's id field
     * @type {Identifier.$id|Identifier.$oid}
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
       * Whether the void trader is active (at time of object creation)
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
   * Get whether the trader is currently active
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
};
