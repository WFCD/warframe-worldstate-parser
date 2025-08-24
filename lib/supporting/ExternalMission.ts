/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 */
export default interface ExternalMission {
  id: string;

  /**
   * start time
   */
  activation: Date;

  /**
   * end timer
   */
  expiry: Date;

  /**
   * formatted node name with planet
   */
  node: string;

  /**
   * Untranslated formatted node name with planet
   */
  nodeKey: string;

  /**
   * Enemy on tile
   */
  enemy: string;

  /**
   * Mission type of node
   */
  type: string;

  /**
   * Untranslated node mission type
   */
  typeKey: string;

  /**
   * whether or not the tile requires archwing
   */
  archwing: boolean;

  /**
   * whether or not the tile requires
   */
  sharkwing: boolean;

  /**
   * Whether the mission is expired at the time of creation or not
   */
  expired: boolean;
}
