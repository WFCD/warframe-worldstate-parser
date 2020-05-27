export = WorldstateObject;
/**
 * Represents a generic ojbect from Worldstate
 */
declare class WorldstateObject {
    /**
     * @param   {Object} data The object data
     */
    constructor(data: any, { timeDate }: {
        timeDate: any;
    });
    /**
     * The object's id field
     * @type {string}
     */
    id: string;
    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    private timeDate;
    /**
     * The date and time at which the void trader arrives
     * @type {Date}
     */
    activation: Date;
    /**
     * A string indicating how long it will take for the trader to arrive
     *  (at time of object creation)
     * @type {string}
     */
    startString: string;
    /**
     * The date and time at which the void trader leaves
     * @type {Date}
     */
    expiry: Date;
    /**
     * Whether or not the void trader is active (at time of object creation)
     * @type {boolean}
     */
    active: boolean;
    /**
     * Returns a string representation of the object
     * @returns {string}
     */
    toString(): string;
    /**
     * Get whether or not the trader is currently active
     * @returns {boolean}
     */
    isActive(): boolean;
    /**
     * Get a string indicating how long it will take for the trader to arrive
     * @returns {string}
     */
    getStartString(): string;
    /**
     * Get a string indicating how long it will take for the trader to leave
     * @returns {string}
     */
    getEndString(): string;
}
