'use strict';

/**
 * Represents a sortie variant
 */
class SortieVariant {
  /**
   * @param   {Object}            data               Sortie variant data
   * @param   {Object}            deps               The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig      The markdown settings
   * @param   {Translator}        deps.translator    The string translator
   * @param   {Object}            deps.sortieData    The data used to parse sorties
   */
  constructor(data, { mdConfig, translator, sortieData }) {
    /**
     * The markdown settings
     * @type {MarkdownSettings}
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
