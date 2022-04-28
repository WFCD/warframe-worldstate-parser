'use strict';

const WorldstateObject = require('./WorldstateObject');
const SyndicateJob = require('./SyndicateJob');

/**
 * Represents a syndicate daily mission
 * @extends {WorldstateObject}
 */
class SyndicateMission extends WorldstateObject {
  /**
   * @param   {Object}             data            The syndicate mission data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { mdConfig, translator, timeDate, locale }) {
    super(data, { timeDate });

    const deps = {
      mdConfig,
      translator,
      timeDate,
      locale,
    };

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The translation functions
     * @type {Translator}
     * @private
     */
    this.translator = translator;
    Object.defineProperty(this, 'translator', { enumerable: false, configurable: false });

    /**
     * The date and time at which the syndicate mission starts
     * @type {Date}
     */
    this.activation = timeDate.parseDate(data.Activation);

    /**
     * The date and time at which the syndicate mission ends
     * @type {Date}
     */
    this.expiry = timeDate.parseDate(data.Expiry);

    /**
     * The syndicate that is offering the mission
     * @type {string}
     */
    this.syndicate = translator.syndicate(data.Tag, locale);

    /**
     * The syndicate that is offering the mission
     * @type {string}
     */
    this.syndicateKey = translator.syndicate(data.Tag, 'en');

    /**
     * The nodes on which the missions are taking place
     * @type {Array.<string>}
     */
    this.nodes = data.Nodes.map((n) => translator.node(n), locale);

    /**
     * The jobs for this syndicate. Will normally be []
     * @type {Array.<SyndicateJob>}
     */
    this.jobs = (data.Jobs || []).map((j) => new SyndicateJob(j, this.expiry, deps));

    /**
     * Unique identifier for this mission set built from the end time and syndicate
     * @type {string}
     */
    this.id = `${this.expiry.getTime()}${data.Tag}`;

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();
  }

  /**
   * Get a string indicating how much time is left before the syndicate mission expries
   * @returns {string}
   */
  getETAString() {
    return this.timeDate.timeDeltaToString(this.timeDate.fromNow(this.expiry));
  }

  /**
   * Returns a string representation of the syndicate mission
   * @returns {string}
   */
  toString() {
    if (this.nodes.length > 0) {
      const missions = this.nodes.map((n) => `  \u2022${n.toString()}`).join(this.mdConfig.lineEnd);
      return `[${this.getETAString()}] ${this.syndicate} currently has missions on:${this.mdConfig.lineEnd}${missions}`;
    }

    return `No missions available for ${this.syndicate}`;
  }
}

module.exports = SyndicateMission;
