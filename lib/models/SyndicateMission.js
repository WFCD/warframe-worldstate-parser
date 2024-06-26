import { fromNow, parseDate, timeDeltaToString, node, syndicate } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import SyndicateJob from './SyndicateJob.js';
import WorldstateObject from './WorldstateObject.js';

/**
 * Represents a syndicate daily mission
 * @augments {WorldstateObject}
 */
export default class SyndicateMission extends WorldstateObject {
  /**
   * Build a new SyndicateMission with async operations & data
   * @param   {object}             data            The syndicate mission data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   * @returns {Promise.<SyndicateMission>}         SyndicateMission object w/ async resolution of jobs
   */
  static async build(data, deps) {
    const syndicateMission = new SyndicateMission(data, deps);
    if (data.Jobs) {
      const jobs = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const job of data.Jobs ?? []) {
        jobs.push(await SyndicateJob.build(job, syndicateMission.expiry, deps));
      }
      syndicateMission.jobs = jobs;
    }

    return syndicateMission;
  }

  /**
   * @param   {object}             data            The syndicate mission data
   * @param   {object}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    /**
     * The date and time at which the syndicate mission starts
     * @type {Date}
     */
    this.activation = parseDate(data.Activation);

    /**
     * The date and time at which the syndicate mission ends
     * @type {Date}
     */
    this.expiry = parseDate(data.Expiry);

    /**
     * The syndicate that is offering the mission
     * @type {string}
     */
    this.syndicate = syndicate(data.Tag, locale);

    /**
     * The syndicate that is offering the mission
     * @type {string}
     */
    this.syndicateKey = syndicate(data.Tag, 'en');

    /**
     * The nodes on which the missions are taking place
     * @type {Array.<string>}
     */
    this.nodes = data.Nodes.map((n) => node(n), locale);

    /**
     * The jobs for this syndicate. Will normally be []
     * @type {Array.<SyndicateJob>}
     */
    this.jobs = [];

    /**
     * Unique identifier for this mission set built from the end time and syndicate
     * @type {string}
     */
    this.id = `${this.expiry.getTime()}${data.Tag}`;

    /**
     * ETA string (at time of object creation)
     * @type {string} time delta string from now to the expiry
     */
    this.eta = this.getETAString();
  }

  /**
   * Get a string indicating how much time is left before the syndicate mission expries
   * @returns {string} time delta string from now to the expiry
   */
  getETAString() {
    return timeDeltaToString(fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the syndicate mission
   * @returns {string} the string representation
   */
  toString() {
    if (this.nodes.length > 0) {
      const missions = this.nodes.map((n) => `  \u2022${n.toString()}`).join(mdConfig.lineEnd);
      return `[${this.getETAString()}] ${this.syndicate} currently has missions on:${mdConfig.lineEnd}${missions}`;
    }

    return `No missions available for ${this.syndicate}`;
  }
}
