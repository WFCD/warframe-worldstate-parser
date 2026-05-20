import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

import type { Dependency } from '@/supporting';

import { Kinepage } from './Kinepage';
import { SentientOutpost } from './SentientOutpost';

export interface InitialTmp {
  sfn: number;
  pgr: { [k: string]: string | number };
  fbst?: { a: number; e: number; n: number };
  QTCCFloofCount?: number;
  QTCCFloofLimit?: number;
}

export class FaceoffBonus {
  @IsDate()
  @Type(() => Date)
  activation!: Date;

  @IsDate()
  @Type(() => Date)
  expiry!: Date;

  @IsDate()
  @Type(() => Date)
  next!: Date;
}

export class QuestProgress {
  @IsInt()
  @Min(0)
  count!: number;

  @IsInt()
  @Min(0)
  goal!: number;
}

export class Tmp {
  @ValidateNested()
  @Type(() => SentientOutpost)
  sentientOutposts: SentientOutpost;

  @ValidateNested()
  @Type(() => Kinepage)
  kinepage: Kinepage;

  @IsOptional()
  @ValidateNested()
  @Type(() => FaceoffBonus)
  faceoffBonus?: FaceoffBonus;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuestProgress)
  questToConquerCancer?: QuestProgress;

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
