export = ConstructionProgress;
declare const ConstructionProgress_base: typeof import("./WorldstateObject.js");
/**
 * Represents enemy construction progress
 * @extends {WorldstateObject}
 */
declare class ConstructionProgress extends ConstructionProgress_base {
    /**
     * @param   {Object}             data            The construction data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     */
    constructor(data: any, { mdConfig, timeDate }: {
        mdConfig: any;
    });
    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    private mdConfig;
    fomorianProgress: any;
    razorbackProgress: any;
    unknownProgress: any;
}
