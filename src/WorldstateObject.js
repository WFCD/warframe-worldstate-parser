'use strict';

/**
 * Represents a generic ojbect from Worldstate
 */
class WorldstateObject {
  /**
   * @param   {Object} data The object data
   */
  constructor(data) {
    this.id = data._id.$id;
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
