import { fromNow, node, syndicate, timeDeltaToString } from 'warframe-worldstate-data/utilities';


import type Dependency from '../supporting/Dependency';
import SyndicateJob, { type RawSyndicateJob } from './SyndicateJob';
import WorldstateObject, { type BaseContentObject } from './WorldstateObject';

export interface RawSyndicateMission extends BaseContentObject {
  Tag: string;
  Nodes: string[];
  Jobs: RawSyndicateJob[];
}

/**
 * Represents a syndicate daily mission
 * @augments {WorldstateObject}
 */
export default class SyndicateMission extends WorldstateObject {
  /**
   * The syndicate that is offering the mission
   * @type {string}
   */
  syndicate: string;

  /**
   * The syndicate that is offering the mission
   * @type {string}
   */
  syndicateKey: string;
  /**
   * The nodes on which the missions are taking place
   * @type {Array.<string>}
   */
  nodes: string[];

  /**
   * The jobs for this syndicate. Will normally be []
   * @type {Array.<SyndicateJob>}
   */
  jobs: SyndicateJob[];

  /**
   * Build a new SyndicateMission with async operations & data
   * @param   data        The syndicate mission data
   * @param   deps        The dependencies object
   * @param   deps.locale Locale to use for translations
   * @returns SyndicateMission object w/ async resolution of jobs
   */
  static async build(data: RawSyndicateMission, deps: Dependency = { locale: 'en' }): Promise<SyndicateMission> {
    const syndicateMission = new SyndicateMission(data, deps);
    if (data.Jobs) {
      const jobs = [];
      for await (const job of data.Jobs ?? []) {
        jobs.push(await SyndicateJob.build(job, syndicateMission.expiry!, deps));
      }
      syndicateMission.jobs = jobs;
    }

    return syndicateMission;
  }

  /**
   * @param data        The syndicate mission data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawSyndicateMission, { locale = 'en' }: Dependency = { locale: 'en' }) {
    super(data);
    this.syndicate = syndicate(data.Tag, locale);
    this.syndicateKey = syndicate(data.Tag, 'en');
    this.nodes = data.Nodes.map((n) => node(n), locale);
    this.jobs = [];

    this.id = `${this.expiry!.getTime()}${data.Tag}`;
  }

  /**
   * Time delta string from now to the expiry
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
