import { missionType, node, sortieModDesc, sortieModifier } from '../utilities/translation.js';
import mdConfig from '../supporting/MarkdownSettings.js';
import { insist } from '../utilities/integrity.js';

/**
 * Represents a sortie variant
 */
export default class SortieVariant {
  /**
   * @param   {object}            data               Sortie variant data
   * @param   {MarkdownSettings}  mdConfig      The markdown settings
   * @param   {string}            locale        Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    insist(data);
    /**
     * The variant's mission type
     * @type {string}
     */
    this.missionType = missionType(data.missionType, locale);

    this.missionTypeKey = missionType(data.missionType, 'en');

    /**
     * The variant's modifier
     * @type {string}
     */
    this.modifier = sortieModifier(data.modifierType, locale);

    /**
     * The variant's modifier description
     * @type {string}
     */
    this.modifierDescription = sortieModDesc(data.modifierType, locale);

    /**
     * The node where the variant takes place
     * @type {string}
     */
    this.node = node(data.node, locale);

    this.nodeKey = node(data.node, 'en');
  }

  /**
   * Returns a string representation of the sortie variant
   * @returns {string}
   */
  toString() {
    return this.modifier
      ? `${this.node.padEnd(25, ' ')} |  ${this.modifier.padEnd(20, ' ')} | ${this.missionType}${mdConfig.lineEnd}`
      : `${this.node.padEnd(25, ' ')} | ${this.missionType}${mdConfig.lineEnd}`;
  }
}
