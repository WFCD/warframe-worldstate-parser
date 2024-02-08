import { parseDate, fromNow, timeDeltaToString } from '../utilities/timeDate.js';
import { insist } from '../utilities/integrity.js';

/**
 * @typedef {object} Identifier
 * @property {string} $id older identifier schema
 * @property {string} $oid newer global identifier schema
 */
/**
 * @typedef {object} LegacyTimestamp
 * @property {number} sec second-based timestamp
 */
/**
 * @typedef {object} Timestamp
 * @property {number} $numberLong millisecond-based timestamp
 */
/**
 * @typedef {object} ContentTimestamp
 * @property {LegacyTimestamp|Timestamp} $date timestamp number wrapper
 */
/**
 * @typedef {object} BaseContentObject
 * @property {Identifier} _id object identifier
 * @property {ContentTimestamp} Activation activation timestamp
 * @property {ContentTimestamp} Expiry expiry timestamp
 */

/**
 * Represents a generic object from Worldstate
 */
export default class WorldstateObject {
  /**
   * @param   {BaseContentObject} data The object data
   */
  constructor(data) {
    insist(data);
    /**
     * The object's id field
     * @type {Identifier.$id|Identifier.$oid}
     */
    // eslint-disable-next-line no-underscore-dangle
    this.id = data._id ? data._id.$oid || data._id.$id : undefined;

    if (data.Activation) {
      /**
       * The date and time at which the void trader arrives
       * @type {Date}
       */
      this.activation = parseDate(data.Activation);

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
      this.expiry = parseDate(data.Expiry);
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
   * @returns {string} basic representation from the id
   */
  toString() {
    return `id: ${this.id}`;
  }

  /**
   * Get whether the trader is currently active
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
}
