import { Locale } from 'warframe-worldstate-data';
import ExternalMission from './ExternalMission';
import { SortieData } from 'warframe-worldstate-data/types';

/**
 * Dependency Object
 */
export default interface Dependency {
  kuvaData?: unknown[];

  /**
   * Locale to use for translations
   */
  locale: Locale;

  /**
   * Generic logger to use if needed
   */
  logger?: any;

  sentientData?: { start: number; end: number };

  sortieData?: SortieData;
}
