export = Kuva;
/**
 * Stores and parses kuva data from https://10o.io/kuvalog.json
 * @property {ExternalMission[]} kuva currently active kuva missions
 * @property {ExternalMission} arbitration current arbitration
 */
declare class Kuva {
    constructor({ kuvaData, translator, locale, logger, }: {
        kuvaData: any;
        translator: any;
        locale: any;
        logger: any;
    });
    /**
     * The translation functions
     * @type {Translator}
     * @private
     */
    private translator;
    /**
     * The locale to leverage for translations
     * @type {string}
     * @private
     */
    private locale;
}
declare namespace Kuva {
    export { ExternalMission, Kuva };
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
/**
 * Stores and parses kuva data from https://10o.io/kuvalog.json
 */
type Kuva = {
    /**
     * currently active kuva missions
     */
    kuva: ExternalMission[];
    /**
     * current arbitration
     */
    arbitration: ExternalMission;
};
