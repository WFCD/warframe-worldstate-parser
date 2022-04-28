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
   * @param   {string}            deps.locale        Locale to use for translations
   */
  constructor(data, { mdConfig, translator, locale }) {
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The variant's mission type
     * @type {string}
     */
    this.missionType = translator.missionType(data.missionType, locale);

    /**
     * The variant's modifier
     * @type {string}
     */
    this.modifier = translator.sortieModifier(data.modifierType, locale);

    /**
     * The variant's modifier description
     * @type {string}
     */
    this.modifierDescription = translator.sortieModDesc(data.modifierType, locale);

    /**
     * The node where the variant takes place
     * @type {string}
     */
    this.node = translator.node(data.node, locale);
  }

  /**
   * Returns a string representation of the sortie variant
   * @returns {string}
   */
  toString() {
    return `${this.node.padEnd(25, ' ')} |  ${this.modifier.padEnd(20, ' ')} | ${this.missionType}${
      this.mdConfig.lineEnd
    }`;
  }
}

module.exports = SortieVariant;
