import { missionType, node, sortieModDesc, sortieModifier, insist } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

/**
 * Represents a sortie variant
 * @class
 */
export default class SortieVariant {
  /**
   * Make the SortieVariant
   * @class
   * @param {object} data Sortie variant data
   * @param {object} deps Dependencies
   * @param {string} deps.locale Locale to use for translations
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
   * @returns {string} string representation
   */
  toString() {
    return this.modifier
      ? `${this.node.padEnd(25, ' ')} |  ${this.modifier.padEnd(20, ' ')} | ${this.missionType}${mdConfig.lineEnd}`
      : `${this.node.padEnd(25, ' ')} | ${this.missionType}${mdConfig.lineEnd}`;
  }
}
