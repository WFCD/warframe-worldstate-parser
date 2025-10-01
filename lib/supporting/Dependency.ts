import type { Locale } from 'warframe-worldstate-data';
import type { SortieData } from 'warframe-worldstate-data/types';
import type { KuvaLogEntry } from './KuvaLogEntry';

/**
 * Dependency Object
 */
export default interface Dependency {
  /**
   * Kuva data for parsing
   */
  kuvaData?: KuvaLogEntry[];

  /**
   * Locale to use for translations
   */
  locale: Locale;

  /**
   * Generic logger to use if needed
   */
  logger?: { debug: (message: string) => void };

  /**
   * Sentint Data for parsing
   */
  sentientData?: { start: number; end: number };

  /**
   * Sortie data for parsing
   */
  sortieData?: SortieData;

  /**
   * Character name for traders
   */
  character?: string;
}
