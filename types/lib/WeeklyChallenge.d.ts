export = WeeklyChallenge;
declare const WeeklyChallenge_base: typeof import("./WorldstateObject");
/**
 * Represents a void trader
 * @extends {WorldstateObject}
 */
declare class WeeklyChallenge extends WeeklyChallenge_base {
    /**
     * @param   {Object}             data            The Void trader data
     * @param   {Object}             deps            The dependencies object
     * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
     * @param   {Translator}         deps.translator The string translator
     * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
     */
    constructor(data: any, { timeDate, translator }: {
        mdConfig: any;
        translator: any;
        timeDate: any;
    });
    challenges: any;
}
