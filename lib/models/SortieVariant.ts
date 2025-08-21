import { missionType, node, sortieModDesc, sortieModifier, insist } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';
import Dependency from '../supporting/Dependency';

export interface RawSortieVariant {
  missionType: string;
  modifierType: string;
  node: string;
}

/**
 * Represents a sortie variant
 * @class
 */
export default class SortieVariant {
  /**
   * The variant's mission type
   */
  missionType: string;

  /**
   * The variant's mission type unlocalzied
   */
  missionTypeKey: string;

  /**
   * The mission modifier
   */
  modifier: string;

  /**
   * The variant's modifier description
   */
  modifierDescription: string;

  /**
   * The node where the variant takes place
   */
  node: string;

  /**
   * The node where the variant takes place unlocalized
   */
  nodeKey: string;

  /**
   * Make the SortieVariant
   * @param data Sortie variant data
   * @param deps Dependencies
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawSortieVariant, { locale = 'en' }: Dependency = { locale: 'en' }) {
    insist({ ...data });

    this.missionType = missionType(data.missionType, locale);

    this.missionTypeKey = missionType(data.missionType, 'en');

    this.modifier = sortieModifier(data.modifierType, locale);

    this.modifierDescription = sortieModDesc(data.modifierType, locale);

    this.node = node(data.node, locale);

    this.nodeKey = node(data.node, 'en');
  }
}
