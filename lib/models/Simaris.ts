import { languageString } from 'warframe-worldstate-data/utilities';
import Dependency from '../supporting/Dependency';

/**
 * Simaris library info
 */
export type LibraryInfo = { LastCompletedTargetType: string };

/**
 * Contains information about sanctuary targets
 */
export default class Simaris {
  target: string;
  isTargetActive: boolean;
  asString: string;

  /**
   * @param   {object}             data            The sanctuary data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data?: LibraryInfo, { locale }: Dependency = { locale: 'en' }) {
    if (!data || !Object.keys(data).length) {
      // eslint-disable-next-line no-param-reassign
      data = { LastCompletedTargetType: '' };
    }

    /**
     * The sanctuary target
     * @type {string}
     */
    this.target = languageString(data.LastCompletedTargetType, locale) || 'N/A';

    /**
     * Whether or not the target is currently active
     * @type {boolean}
     */
    this.isTargetActive = !data.LastCompletedTargetType;

    /**
     * A string representation of the current sanctuary status
     * @type {string}
     */
    this.asString = this.toString();
  }

  /**
   * Returns a string representation of the current sanctuary status
   */
  toString(): string {
    return (
      `Simaris's ${this.isTargetActive ? 'current' : 'previous'} objective ` +
      `${this.isTargetActive ? 'is' : 'was'} ${this.target}`
    );
  }
}
