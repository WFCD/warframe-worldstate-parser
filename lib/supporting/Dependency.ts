import { Locale } from 'warframe-worldstate-data';
import ExternalMission from './ExternalMission';
import { SortieData } from 'warframe-worldstate-data/types';

/**
 * Dependency Object
 */
export default interface Dependency {
  /**
   * Kuva data for parsing
   */
  kuvaData?: unknown[];

  /**
   * Locale to use for translations
   */
  locale: Locale;

  /**
   * Generic logger to use if needed
   */
  logger?: any;

  /**
   * Sentint Data for parsing
   */
  sentientData?: { start: number; end: number };

  /**
   * Sortie data for parsing
   */
  sortieData?: SortieData;
}
