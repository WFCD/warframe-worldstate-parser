import { node, nodeEnemy, nodeMissionType } from 'warframe-worldstate-data/utilities';
import type Dependency from '../supporting/Dependency';

const duration = 1800;

const sat = () => {
  const now = Math.floor(Date.now() / 1000);
  // One cycle = 3 hours
  const cycleSeconds = now % duration;
  // active range is after 30m and lasts for 30m
  const active = cycleSeconds > 0 && cycleSeconds < 1800;
  const start = (now - cycleSeconds) * 1000;
  const end = (now - cycleSeconds + duration) * 1000;

  return {
    active,
    expiry: new Date(end),
    activation: new Date(start),
  };
};

/**
 * Mission typeDef
 */
interface Mission {
  node: string;
  faction: string;
  type: string;
}

/**
 * Represents a set of sentient outposts that are present
 * Parsed source is combined data from DE's worldstate and semlar.com/anomaly.json
 */
export default class SentientOutpost {
  private node: string | number;

  id: string;

  /**
   * Start time
   */
  activation: Date;
  /**
   * End time
   */
  expiry: Date;

  /**
   * Current Mission
   */
  mission?: Mission;

  /**
   * Whether or not the object was active during creation
   */
  active: boolean;

  /**
   * @param sfn  Sentient outpost node number
   * @param deps Dependencies
   */
  constructor(sfn: string | number | undefined, { locale, sentientData, logger}: Dependency) {
    this.node = sfn || '000';
    const id = `CrewBattleNode${this.node}`;
    if (this.node === '000') {
      this.mission = undefined;
    } else {
      this.mission = {
        node: node(id, locale),
        faction: nodeEnemy(id, locale),
        type: nodeMissionType(id, locale),
      };
    }
    ({ activation: this.activation, expiry: this.expiry } = sat());
    this.active = Boolean(this.mission);
    this.id = `${id}:${this.active}`;

    if (!sentientData) {
      logger?.debug('No outpost data, skipping');
    } else {
      this.activation = new Date(sentientData.start * 1000);
      this.expiry = new Date(sentientData.end * 1000);
    }
  }
}
