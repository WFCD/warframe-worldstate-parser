'use strict';

const rPad = require('right-pad');

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
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    if (data.modifierType) {
      /**
       * The variant's boss
       * @type {string}
       */
      this.boss = 'Deprecated';

      /**
       * The planet where the variant takes place
       * @type {string}
       */
      this.planet = 'Deprecated';

      /**
       * The variant's mission type
       * @type {string}
       */
      this.missionType = translator.missionType(data.missionType);

      /**
       * The variant's modifier
       * @type {string}
       */
      this.modifier = translator.sortieModifier(data.modifierType);
      
      /**
       * The variant's modifier description
       * @type {string}
       */
      this.modifierDescription = translator.sortieModDesc(data.modifierType);
    } else {
      this.boss = sortieData.endStates[data.bossIndex].bossName;
      const region = sortieData.endStates[data.bossIndex].regions[data.regionIndex];
      this.planet = region.name;
      this.missionType = region.missions[data.missionIndex];
      this.modifier = sortieData.modifiers[data.modifierIndex];
    }

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
    return `${rPad(this.node, 25, ' ')} |  ${rPad(this.modifier, 20, '')} | ${this.missionType}${this.mdConfig.lineEnd}`;
  }
}

module.exports = SortieVariant;
