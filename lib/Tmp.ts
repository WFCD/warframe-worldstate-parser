import type { RawArchimedea } from './models/Archidemea';
import Archimedea from './models/Archidemea';
import Kinepage from './models/Kinepage';
import SentientOutpost from './models/SentientOutpost';
import type Dependency from './supporting/Dependency';

export interface InitialTmp {
  sfn: number;
  pgr: { [k: string]: string | number };
  lqo?: RawArchimedea;
  hqo?: RawArchimedea;
}

export class Tmp {
  sentientOutposts: SentientOutpost;
  kinepage: Kinepage;
  deepArchimedea?: Archimedea;
  temporalArchimedea?: Archimedea;

  constructor(json: string, deps: Dependency = { locale: 'en' }) {
    const tmp: InitialTmp = JSON.parse(json);

    this.sentientOutposts = new SentientOutpost(tmp.sfn, deps);

    this.kinepage = new Kinepage(tmp.pgr, deps.locale);

    if (tmp.lqo) {
      this.deepArchimedea = new Archimedea(tmp.lqo);
    }

    if (tmp.hqo) {
      this.temporalArchimedea = new Archimedea(tmp.hqo);
    }
  }
}
