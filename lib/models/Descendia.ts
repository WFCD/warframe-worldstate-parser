import { createHash } from 'node:crypto';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { insist, languageString } from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawDescentChallenge {
  Index: number;
  Type: string;
  Challenge: string;
  Level: string;
  Specs: string[];
  Auras: string[];
}

export interface RawDescent extends BaseContentObject {
  RandSeed: number;
  Challenges: RawDescentChallenge[];
}

/**
 * A keyed Descendia path that keeps the raw uniqueName
 */
export class DescendiaKeyedItem {
  /**
   * Raw uniqueName path
   */
  @IsString()
  uniqueName: string;

  /**
   * Localized name
   */
  @IsString()
  name: string;

  constructor(uniqueName: string, locale: string) {
    this.uniqueName = uniqueName;
    this.name = languageString(uniqueName, locale);
  }
}

/**
 * A single Infernum floor in The Descendia
 */
export class DescendiaChallenge {
  /**
   * Floor number (1-21)
   */
  @IsInt()
  @Min(1)
  index: number;

  /**
   * Localized mission objective
   */
  @IsString()
  type: string;

  /**
   * Raw mission objective key (e.g. DT_EXTERMINATE)
   */
  @IsString()
  typeKey: string;

  /**
   * Localized floor content / penance
   */
  @IsString()
  challenge: string;

  /**
   * Raw floor content key (e.g. JadeGuardian, Wisp, Devil)
   */
  @IsString()
  challengeKey: string;

  /**
   * Localized level / map name
   */
  @IsString()
  level: string;

  /**
   * Raw level uniqueName path
   */
  @IsString()
  levelUniqueName: string;

  /**
   * Enemy mix specs
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescendiaKeyedItem)
  specs: DescendiaKeyedItem[];

  /**
   * Penance auras
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescendiaKeyedItem)
  auras: DescendiaKeyedItem[];

  /**
   * @param data        Raw challenge data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(
    data: RawDescentChallenge,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    this.index = data.Index;
    this.type = languageString(data.Type, locale);
    this.typeKey = data.Type;
    this.challenge = languageString(data.Challenge, locale);
    this.challengeKey = data.Challenge;
    this.level = languageString(data.Level, locale);
    this.levelUniqueName = data.Level;
    this.specs = (data.Specs ?? []).map(
      (spec) => new DescendiaKeyedItem(spec, locale)
    );
    this.auras = (data.Auras ?? []).map(
      (aura) => new DescendiaKeyedItem(aura, locale)
    );
  }
}

/**
 * Weekly Descendia rotation (The Dark Refractory)
 */
export class Descendia extends WorldStateObject {
  /**
   * MD5 generated ID
   */
  @IsString()
  id: string;

  /**
   * Seed used to generate this week's floors
   */
  @IsNumber()
  seed: number;

  /**
   * All 21 Infernum floors
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescendiaChallenge)
  challenges: DescendiaChallenge[];

  /**
   * @param data        Raw descent data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(data: RawDescent, { locale }: Dependency = { locale: 'en' }) {
    insist({ ...data }, 'RandSeed', 'Challenges');
    super(data);

    this.id = createHash('md5')
      .update(JSON.stringify(data), 'utf8')
      .digest('hex');

    this.seed = data.RandSeed;
    this.challenges = data.Challenges.map(
      (challenge) => new DescendiaChallenge(challenge, { locale })
    );
  }
}
