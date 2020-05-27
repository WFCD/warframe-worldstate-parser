export = ExternalMission;
/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 * @typedef {Object} ExternalMission
 * @property {Date} activation start time
 * @property {Date} expiry end timer
 * @property {string} node formatted node name with planet
 * @property {string} enemy Enemy on tile
 * @property {string} type Mission type of node
 * @property {boolean} archwing whether or not the tile requires archwing
 * @property {boolean} sharkwing whether or not the tile requires
 *    sumbersible archwing
 */
declare class ExternalMission {
}
declare namespace ExternalMission {
    export { ExternalMission };
}
/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 */
type ExternalMission = {
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
     * Enemy on tile
     */
    enemy: string;
    /**
     * Mission type of node
     */
    type: string;
    /**
     * whether or not the tile requires archwing
     */
    archwing: boolean;
    /**
     * whether or not the tile requires
    sumbersible archwing
     */
    sharkwing: boolean;
};
