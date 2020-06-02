/**
 * An object containing functions to format dates and times
 */
export type TimeDateFunctions = any;
/**
 * @param   {number} millis The number of milliseconds in the time delta
 * @returns {string}
 */
export function timeDeltaToString(millis: number): string;
/**
 * Returns the number of milliseconds between now and a given date
 * @param   {Date} d         The date from which the current time will be subtracted
 * @param   {function} [now] A function that returns the current UNIX time in milliseconds
 * @returns {number}
 */
export function fromNow(d: Date, now?: Function): number;
/**
 * Returns the number of milliseconds between a given date and now
 * @param   {Date} d         The date that the current time will be subtracted from
 * @param   {function} [now] A function that returns the current UNIX time in milliseconds
 * @returns {number}
 */
export function toNow(d: Date, now?: Function): number;
/**
 * Returns a new Date constructed from a worldState date object
 * @param {Object} d The worldState date object
 * @returns {Date}
 */
export function parseDate(d: any): Date;
