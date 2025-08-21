import { languageString } from 'warframe-worldstate-data/utilities';
import type Dependency from '../supporting/Dependency';

/**
 * Simaris library info
 */
export type LibraryInfo = { LastCompletedTargetType: string };

/**
 * Contains information about sanctuary targets
 */
export default class Simaris {
  /**
   * The sanctuary target
   */
  target: string;
  
  /**
   * Whether or not the target is currently active
   */
  isTargetActive: boolean;

  /**
   * @param data        The sanctuary data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data?: LibraryInfo, { locale }: Dependency = { locale: 'en' }) {
    if (!data || !Object.keys(data).length) {
      // eslint-disable-next-line no-param-reassign
      data = { LastCompletedTargetType: '' };
    }

    this.target = languageString(data.LastCompletedTargetType, locale) || 'N/A';
    this.isTargetActive = !data.LastCompletedTargetType;
  }

  /**
   * A string representation of the current sanctuary status
   */
  get asString(): string {
    return (
      `Simaris's ${this.isTargetActive ? 'current' : 'previous'} objective ` +
      `${this.isTargetActive ? 'is' : 'was'} ${this.target}`
    );
  }
}
