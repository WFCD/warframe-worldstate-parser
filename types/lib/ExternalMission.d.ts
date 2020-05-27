export = ExternalMission;

/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 */
declare type ExternalMission = {
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