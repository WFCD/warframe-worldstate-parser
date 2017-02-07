'use strict';

/**
 * Represents a generic ojbect from Worldstate
 */
class WorldstateObject {
  /**
   * @param   {Object} data The object data
   */
  constructor(data) {
    /**
     * The object's id field
     * @type {string}
     */
    this.id = data._id.$oid;
  }

  /**
   * Returns a string representation of the object
   * @returns {string}
   */
  toString() {
    return `id: ${this.id}`;
  }
}

module.exports = WorldstateObject;
