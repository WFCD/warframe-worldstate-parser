export = SentientOutpost;
/**
 * Mission typeDef
 * @typedef {Object} Mission
 * @property {string} node Mission node name
 * @property {string} enemy Node enemy
 * @property {string} type Mission type of the node
 */
/**
 * Represents a set of sentient outposts that are present
 * Parsed source is combined data from DE's worldstate and semlar.com/anomaly.json
 * @property {Mission} mission    List of current missions
 * @property {string}  id         Identifier for the mission node with active indicator
 * @property {boolean} active     Whether or not the mission is active
 * @property {Date}    activation When the mission became or becomes active
 * @property {Date}    expiry     When the mission became or becomes inactive
 * @property {Object}  previous   Estimation data for the last mission that was active.
 *                                Could also be the current.
 * @property {Date}    previous.activation  When the mission became or becomes active
 * @property {Date}    previous.expiry     When the mission became or becomes inactive
 */
declare class SentientOutpost {
    constructor(data: string, { translator, locale, sentientData, logger, }: {
        translator: any;
        locale: any;
        sentientData: any;
        logger: any;
    });
    mission: {
        node: any;
        faction: any;
        type: any;
    };
    active: boolean;
    id: string;
    activation: Date;
    expiry: Date;
}
declare namespace SentientOutpost {
    export { Mission };
}
/**
 * Mission typeDef
 */
type Mission = {
    /**
     * Mission node name
     */
    node: string;
    /**
     * Node enemy
     */
    enemy: string;
    /**
     * Mission type of the node
     */
    type: string;
};
