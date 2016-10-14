'use strict';

/**
 * Represents a sortie variant
 */
class SortieVariant {
  /**
   * @param   {Object} data               Sortie variant data
   * @param   {Object} options.translator The string translator
   * @param   {Object} options.sortieData The data used to parse sorties
   * @param   {Object} options.mdConfig   The markdown configuration
   */
  constructor(data, { translator, sortieData, mdConfig }) {
    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The variant's boss
     * @type {string}
     */
    this.boss = sortieData.endStates[data.bossIndex].bossName;

    const region = sortieData.endStates[data.bossIndex].regions[data.regionIndex];

    /**
     * The planet where the variant takes place
     * @type {string}
     */
    this.planet = region.name;

    /**
     * The variant's mission type
     * @type {string}
     */
    this.missionType = region.missions[data.missionIndex];

    /**
     * The variant's modifier
     * @type {string}
     */
    this.modifier = sortieData.modifiers[data.modifierIndex];

    /**
     * The node where the variant takes place
     * @type {string}
     */
    this.node = translator.node(data.node);
  }

  /**
   * Returns a string representation of the sortie variant
   * @returns {string}
   */
  toString() {
    return `${this.node} ${this.modifier} ${this.missionType}${this.mdConfig.lineEnd}`;
  }
}

module.exports = SortieVariant;
