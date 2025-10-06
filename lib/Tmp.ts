import type { RawArchimedea } from './models/Archidemea';
import Archimedea from './models/Archidemea';
import Kinepage from './models/Kinepage';
import SentientOutpost from './models/SentientOutpost';
import type Dependency from './supporting/Dependency';

export interface InitialTmp {
  sfn: number;
  pgr: { [k: string]: string | number };
  fbst?: { a: number; e: number; n: number };
  lqo?: RawArchimedea;
  hqo?: RawArchimedea;
  QTCCFloofCount?: number;
  QTCCFloofLimit?: number;
}

export class Tmp {
  sentientOutposts: SentientOutpost;
  kinepage: Kinepage;
  deepArchimedea?: Archimedea;
  temporalArchimedea?: Archimedea;
  faceoffBonus?: { activation: Date; expiry: Date; next: Date };
  questToConquerCancer?: { count: number; goal: number };

  constructor(json: string, deps: Dependency = { locale: 'en' }) {
    const tmp: InitialTmp = JSON.parse(json);

    this.sentientOutposts = new SentientOutpost(tmp.sfn, deps);

    this.kinepage = new Kinepage(tmp.pgr, deps.locale);

    if (tmp.fbst) {
      const toDate = (ms: number) => new Date(ms * 1000);
      this.faceoffBonus = {
        activation: toDate(tmp.fbst.a),
        expiry: toDate(tmp.fbst.e),
        next: toDate(tmp.fbst.n),
      };
    }

    if (tmp.lqo) {
      this.deepArchimedea = new Archimedea(tmp.lqo, deps.locale);
    }

    if (tmp.hqo) {
      this.temporalArchimedea = new Archimedea(tmp.hqo, deps.locale);
    }

    if (tmp.QTCCFloofCount) {
      this.questToConquerCancer = { count: tmp.QTCCFloofCount, goal: tmp.QTCCFloofLimit! };
    }
  }
}
