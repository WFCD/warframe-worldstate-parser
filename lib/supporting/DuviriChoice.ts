import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

import type { BaseContentObject } from '@/models';

export interface RawChoice extends BaseContentObject {
  Category: 'EXC_NORMAL' | 'EXC_HARD';
  Choices: string[];
}

/**
 * Single category of duviri choices
 */
export class DuviriChoice {
  /**
   * Category of the choice. One of 'normal', 'hard'
   */
  @ApiProperty({
    description: "Category of the choice. One of 'normal', 'hard'",
  })
  @IsString()
  category: string;

  /**
   * Raw category key from the API
   */
  @ApiProperty({ description: 'Raw category key from the API' })
  @IsString()
  categoryKey: string;

  /**
   * Array of available choices
   */
  @ApiProperty({ description: 'Array of available choices', type: [String] })
  @IsArray()
  @IsString({ each: true })
  choices: string[];

  constructor(data: RawChoice) {
    switch (data.Category) {
      case 'EXC_NORMAL':
        this.category = 'normal';
        break;
      case 'EXC_HARD':
        this.category = 'hard';
        break;
      default:
        throw new Error(`Unknown category ${data.Category}`);
    }
    this.categoryKey = data.Category;
    this.choices = data.Choices;
  }
}
