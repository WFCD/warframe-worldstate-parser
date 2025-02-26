import {
  languageDesc,
  languageString,
  parseDate,
  translateCalendarEvent,
  translateSeason,
} from 'warframe-worldstate-data/utilities';

const EventTypes = Object.freeze({
  PLOT: 'CET_PLOT',
  REWARD: 'CET_REWARD',
  CHALLENGE: 'CET_CHALLENGE',
  UPGRADE: 'CET_UPGRADE',
});

/**
 * Event data for a 1999 calendar day
 * @param {object} event raw event data
 */
class DayEvent {
  constructor(event) {
    this.type = translateCalendarEvent(event.type);

    if (event.challenge) this.challenge = this.eventDescription(event.challenge);

    if (event.upgrade) this.upgrade = this.eventDescription(event.upgrade);

    if (event.reward) this.reward = languageString(event.reward);

    if (event.type === EventTypes.PLOT) {
      this.dialogueName = event.dialogueName;
      this.dialogueConvo = event.dialogueConvo;
    }
  }

  eventDescription(name) {
    return { title: languageString(name), description: languageDesc(name) };
  }
}

export default class Calendar {
  constructor(calendar) {
    this.activation = parseDate(calendar.Activation);

    this.expiry = parseDate(calendar.Expiry);

    this.days = Array.isArray(calendar.Days)
      ? calendar.Days.filter(Boolean).map((d) => ({
          ...d,
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
   * @param {number} day number of the day in a year
   * @returns {Date} the date in 1999
   */
  getDate(day) {
    const date = new Date(Date.UTC(1999));
    date.setUTCDate(date.getUTCDate() + day - 1);
    return date;
  }
}
