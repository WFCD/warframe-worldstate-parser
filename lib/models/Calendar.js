import {
  languageDesc,
  languageString,
  parseDate,
  translateCalendarEvent,
  translateSeason,
} from 'warframe-worldstate-data/utilities';

class DayEvent {
  constructor(event) {
    this.type = translateCalendarEvent(event.type);

    if (event.challenge) this.challenge = this.eventDescription(event.challenge);

    if (event.upgrade) this.upgrade = this.eventDescription(event.upgrade);

    if (event.reward) this.reward = languageString(event.reward);

    if (event.type === 'CET_PLOT') {
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

    this.expiry = parseDate(Calendar.Expiry);

    this.days = calendar.Days.map((d) => ({ ...d, events: d.events.map((e) => new DayEvent(e)) }));

    this.season = translateSeason(calendar.Season);

    this.yearIteration = calendar.YearIteration;

    this.version = calendar.Version;

    this.requirements = calendar.UpgradeAvaliabilityRequirements;
  }
}
