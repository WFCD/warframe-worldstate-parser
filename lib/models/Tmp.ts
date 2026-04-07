import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Faceoff bonus activation time', type: Date })
  @IsDate()
  @Type(() => Date)
  activation!: Date;

  @ApiProperty({ description: 'Faceoff bonus expiry time', type: Date })
  @IsDate()
  @Type(() => Date)
  expiry!: Date;

  @ApiProperty({ description: 'Next faceoff bonus time', type: Date })
  @IsDate()
  @Type(() => Date)
  next!: Date;
}

export class QuestProgress {
  @ApiProperty({ description: 'Current progress count' })
  @IsInt()
  @Min(0)
  count!: number;

  @ApiProperty({ description: 'Goal target' })
  @IsInt()
  @Min(0)
  goal!: number;
}

export class Tmp {
  @ApiProperty({
    description: 'Sentient outpost information',
    type: () => SentientOutpost,
  })
  @ValidateNested()
  @Type(() => SentientOutpost)
  sentientOutposts: SentientOutpost;

  @ApiProperty({
    description: 'Kinepage message',
    type: () => Kinepage,
  })
  @ValidateNested()
  @Type(() => Kinepage)
  kinepage: Kinepage;

  @ApiPropertyOptional({
    description: 'Faceoff bonus information',
    type: () => FaceoffBonus,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FaceoffBonus)
  faceoffBonus?: FaceoffBonus;

  @ApiPropertyOptional({
    description: 'Quest to Conquer Cancer progress',
    type: () => QuestProgress,
  })
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
