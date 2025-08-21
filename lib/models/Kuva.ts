import { createHash } from 'node:crypto';

import { node, nodeMissionType } from 'warframe-worldstate-data/utilities';
import { Locale } from 'warframe-worldstate-data';
import Dependency from '../supporting/Dependency';
import ExternalMission from '../supporting/ExternalMission';

const HOURS_2 = 7200000;

/**
 * Truncate time for a semlar-provided mission
 * @param mission parsed mission with re-aligned field names
 */
const truncateTime = (mission: ExternalMission) => {
  mission.expiry.setHours(mission.activation.getHours() + 1);
  mission.expiry.setMinutes(4);
  mission.expiry.setSeconds(0);
  mission.expiry.setMilliseconds(0);
  mission.activation.setMinutes(mission.activation.getMinutes() + 5.1);
};

/**
 * Scrub unnecessary details from the mission
 * @param mission parsed mission with re-aligned field names
 */
const scrub = (mission: Record<string, unknown>) => {
  delete mission.solnode;
  delete mission.name;
  delete mission.node_type;
  delete mission.tile;
  delete mission.planet;
};

const hash = (str: string) => createHash('sha256').update(str, 'utf8').digest('hex');

/**
 * Parse kuva & arbitration data
 * @param data   Data to split for kuva/arbitration
 * @param locale locale to translate
 * @returns Split parsed data
 */
const parse = (data: unknown[], locale: Locale) => {
  const parsed = { kuva: new Array<ExternalMission>(), arbitration: {} as ExternalMission };
  const now = new Date();
  if (!data) return undefined;
  data?.forEach?.((mission: any) => {
    const p = {
      activation: new Date(mission.start),
      expiry: new Date(mission.end),
      ...mission.solnodedata,
      node: node(mission.solnode, locale),
      nodeKey: node(mission.solnode, 'en'),
      type: nodeMissionType(mission.solnode, locale),
      typeKey: nodeMissionType(mission.solnode, 'en'),
    };
    truncateTime(p);
    p.id = hash(JSON.stringify(p));
    p.expired = Date.now() - p.expiry.getTime() < 0;

    if (
      p.activation < now &&
      now < p.expiry &&
      new Date(p.activation.getTime() + HOURS_2) > now &&
      new Date(p.expiry.getTime() - HOURS_2) < now
    ) {
      if (mission.missiontype === 'EliteAlertMission') {
        // if the diff is less than 2 hours?
        parsed.arbitration = p;
      }
      if (mission.missiontype.startsWith('KuvaMission')) parsed.kuva.push(p);
    }
    scrub(p);
  });
  parsed.kuva = Array.from(new Set(parsed.kuva));

  return parsed;
};

/**
 * Stores and parses kuva data from https://10o.io/kuvalog.json
 * @property {ExternalMission[]} kuva currently active kuva missions
 * @property {ExternalMission} arbitration current arbitration
 */
export default class Kuva {
  kuva?: ExternalMission[];
  arbitration?: ExternalMission;

  constructor({ kuvaData, locale, logger }: Dependency) {
    if (!kuvaData) {
      logger?.debug('No defined kuva data, skipping data');
    } else {
      const parsed = parse(kuvaData, locale);

      this.kuva = parsed?.kuva;
      this.arbitration = parsed?.arbitration;
    }
  }
}
