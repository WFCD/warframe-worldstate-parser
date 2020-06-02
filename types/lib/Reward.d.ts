export = Reward;
/**
 * Represents a mission reward
 */
declare class Reward {
    /**
     * @param   {Object} data                 The mission data
     * @param   {Object}             deps            The dependencies object
     * @param   {Translator}         deps.translator The string translator
     * @param   {string}             deps.locale     Locale to use for translations
     */
    constructor(data: any, { translator, locale }: {
        translator: any;
        locale: string;
    });
    /**
     * The items being rewarded
     * @type {Array.<string>}
     */
    items: Array<string>;
    /**
     * The counted items being rewarded
     * @type {Array.<Object>}
     */
    countedItems: Array<any>;
    /**
     * The credits being rewarded
     * @type {number}
     */
    credits: number;
    asString: string;
    itemString: string;
    thumbnail: string;
    color: string | number;
    /**
     * The types of all items that are being rewarded
     * @returns {Array.<string>}
     */
    getTypes(): Array<string>;
    /**
     * The types of all the items that are being rewarded
     * @returns {Array.<RewardType>}
     */
    getTypesFull(): Array<RewardType>;
    /**
     * The reward's string representation
     * @returns {string}
     */
    toString(): string;
}
declare namespace Reward {
    export { RewardType };
}
/**
 * An object describing a type of reward, including name, description,
 * test function to verify type from a string, thumbnail url, and color
 */
type RewardType = {
    /**
     * - Name of the reward type
     */
    name: string;
    /**
     * - Description of the reward type
     */
    description: string;
    /**
     * - Function for testing the return type against a string
     */
    test: string;
    /**
     * - Thumbnail url for this reward type
     */
    thumbnail: string;
    /**
     * - Summary color representing this reward type
     */
    color: string;
};
