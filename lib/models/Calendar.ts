import {
  languageDesc,
  languageString,
  parseDate,
  translateCalendarEvent,
  translateSeason,
} from 'warframe-worldstate-data/utilities';
import WorldstateObject, { BaseContentObject } from './WorldstateObject';

export interface RawCalender extends BaseContentObject {
  Days: { day: number; events: RawDay[] }[];
  Season: string;
  YearIteration: number;
  Version: number;
  UpgradeAvaliabilityRequirements: string[];
}

export interface RawDay {
  type: string;
  challenge?: string;
  upgrade?: string;
  reward?: string;
  dialogueName?: any;
  dialogueConvo?: any;
}

/**
 * Event data for a 1999 calendar day
 */
export class DayEvent {
  type: string;
  challenge?: { title: string; description: string };
  upgrade?: { title: string; description: string };
  reward?: string;
  dialogueName: any;
  dialogueConvo: any;

  /**
   * @param event raw event data
   */
  constructor(event: RawDay) {
    this.type = translateCalendarEvent(event.type);

    if (event.challenge) this.challenge = this.eventDescription(event.challenge);

    if (event.upgrade) this.upgrade = this.eventDescription(event.upgrade);

    if (event.reward) this.reward = languageString(event.reward);

    if (event.type === 'CET_PLOT') {
      this.dialogueName = event.dialogueName;
      this.dialogueConvo = event.dialogueConvo;
    }
  }

  private eventDescription(name: string): { title: string; description: string } {
    return { title: languageString(name), description: languageDesc(name) };
  }
}

export default class Calendar extends WorldstateObject {
  /**
   * Rewards, Challenges, and Calender events
   */
  days: { date: string; events: DayEvent[] }[];

  /**
   * Current Calender Season
   */
  season: string;

  /**
   * Current loop number
   */
  yearIteration: any;

  /**
   * Version
   */
  version: any;
  
  /**
   * Player requirements needed to view this calender
   */
  requirements: any;

  /**
   * @param calendar RawCalender data to parse from
   */
  constructor(calendar: RawCalender) {
    super(calendar);

    this.days = Array.isArray(calendar.Days)
      ? calendar.Days.filter(Boolean).map((d) => ({
          date: this.getDate(d.day).toISOString(),
          events: d.events.map((e) => new DayEvent(e)),
        }))
      : [];

    this.season = translateSeason(calendar.Season);
    this.yearIteration = calendar.YearIteration;
    this.version = calendar.Version;
    this.requirements = calendar.UpgradeAvaliabilityRequirements;
  }

  /**
   * Converts number of day to a date in 1999 in UTC
   */
  private getDate(day: number): Date {
    const date = new Date(Date.UTC(1999));
    date.setUTCDate(date.getUTCDate() + day - 1);
    return date;
  }
}
