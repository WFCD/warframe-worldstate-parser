import {
  fromNow,
  node,
  syndicate,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type RawSyndicateJob, SyndicateJob } from './SyndicateJob';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawSyndicateMission extends BaseContentObject {
  Tag: string;
  Nodes: string[];
  Jobs: RawSyndicateJob[];
}

/**
 * Represents a syndicate daily mission
 * @augments {WorldStateObject}
 */
export class SyndicateMission extends WorldStateObject {
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
  static async build(
    data: RawSyndicateMission,
    deps: Dependency = { locale: 'en' }
  ): Promise<SyndicateMission> {
    const syndicateMission = new SyndicateMission(data, deps);
    if (data.Jobs?.length) {
      syndicateMission.jobs = await Promise.all(
        data.Jobs.map((job) =>
          SyndicateJob.build(job, syndicateMission.expiry!, deps)
        )
      );
    } else {
      syndicateMission.jobs = [];
    }

    return syndicateMission;
  }

  /**
   * @param data        The syndicate mission data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(
    data: RawSyndicateMission,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super(data);
    this.syndicate = syndicate(data.Tag, locale);
    this.syndicateKey = syndicate(data.Tag, 'en');
    this.nodes = data.Nodes.map((n) => node(n, locale));
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
