export = Dependency;

/**
 * Dependency Object
 */
declare type Dependency = {
    /**
     * The markdown settings
     */
    mdConfig: import("./MarkdownSettings");
    /**
     * The string translator
     */
    translator: any;
    /**
     * The time and date functions
     */
    timeDate: any;
    /**
     * The Mission parser
     */
    Mission: import("./Mission.js");
    /**
     * The Reward parser
     */
    Reward: import("./Reward.js");
    /**
     * Locale to use for translations
     */
    locale: string;
    /**
     * Generic logger to use if needed
     */
    logger: object;
};