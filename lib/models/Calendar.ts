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

interface RawDay {
  type: string;
  challenge?: string;
  upgrade?: string;
  reward?: string;
  dialogueName?: any;
  dialogueConvo?: any;
}

/**
 * Event data for a 1999 calendar day
 * @param {object} event raw event data
 */
class DayEvent {
  type: string;
  challenge?: { title: string; description: string };
  upgrade?: { title: string; description: string };
  reward?: string;
  dialogueName: any;
  dialogueConvo: any;

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

  eventDescription(name: string): { title: string; description: string } {
    return { title: languageString(name), description: languageDesc(name) };
  }
}

export default class Calendar extends WorldstateObject {
  activation: Date;
  expiry: Date;
  days: { date: string; events: DayEvent[] }[];
  season: string;
  yearIteration: any;
  version: any;
  requirements: any;

  constructor(calendar: RawCalender) {
    super(calendar);

    this.activation = parseDate(calendar.Activation);

    this.expiry = parseDate(calendar.Expiry);

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
  getDate(day: number): Date {
    const date = new Date(Date.UTC(1999));
    date.setUTCDate(date.getUTCDate() + day - 1);
    return date;
  }
}
