import type { Dependency } from '@/supporting/Dependency';
import { Kinepage } from './Kinepage';
import { SentientOutpost } from './SentientOutpost';

export interface InitialTmp {
  sfn: number;
  pgr: { [k: string]: string | number };
  fbst?: { a: number; e: number; n: number };
  QTCCFloofCount?: number;
  QTCCFloofLimit?: number;
}

export class Tmp {
  sentientOutposts: SentientOutpost;
  kinepage: Kinepage;
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

    if (tmp.QTCCFloofCount) {
      this.questToConquerCancer = {
        count: tmp.QTCCFloofCount,
        goal: tmp.QTCCFloofLimit!,
      };
    }
  }
}
